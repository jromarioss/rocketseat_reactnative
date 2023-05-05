import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as yup from "yup";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
}

const profileSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  password: yup.string().min(6, "A senha deve ter pelo menos 6 digitos.").nullable().transform((value) => !!value ? value : null),
  confirm_password: yup.string().nullable().transform((value) => !!value ? value : null).oneOf([yup.ref('password'), null], "A confirmação de senha não confere.")
    .when('password', {
      is: (Field: any) => Field, //se tem conteúdo dentro, o then então faz nv validação
      then: yup.string().nullable().required("Informe a confirmação da senha.").transform((value) => !!value ? value : null)
    }) 
});

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  const toast = useToast();
  const { user, updateUserProfile } = useAuth();
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    defaultValues: { //passa valores padrão
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema),
  });

  async function handleUserPhotoSelector() {
    setPhotoIsLoading(true);

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4], // imagem 4x4
        allowsEditing: true, // para poder editar a imagem
      });
  
      if (photoSelected.canceled) {
        return;
      }

      if(photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);

        if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma imagem até 5MB',
            placement: 'top',
            bgColor: 'red.500'
          });
        }
        //retorna o final da extenção da img
        const fileExtension = photoSelected.assets[0].uri.split('.').pop(); //.jpg
        
        const nameUser = user.name.replace(' ', ''); //remove os expaço cajo haja espaço no nome a imagem

        //informações que a imagem precisa para enviar para o back-end
        const photoFile = {
          name: `${nameUser}.${fileExtension}`.toLowerCase(), //definir nome da img
          uri: photoSelected.assets[0].uri, //onde a img está
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any;
        
        //enviar arquivo pro backend, cria um nv formulario
        const userPhotoUploadForm = new FormData(); //cria um novo formulário e dentro coloca as informações
        //1pr da um nome, 2pr oq quer enviar
        userPhotoUploadForm.append('avatar', photoFile); //append anexa as informações

        const avatarUpdatedResponse = await api.patch('/users/avatar', userPhotoUploadForm, {
          headers: {
            'Content-type': 'multipart/form-data'
          }
        });

        const userUpdated = user;
        userUpdated.avatar = avatarUpdatedResponse.data.avatar; //recebe o nome da foto do backend
        updateUserProfile(userUpdated); //aqui recebe a nova foto.

        toast.show({
          title: "Foto atualizada!",
          placement: 'top',
          bgColor: 'green.500',
        })
      }
  
    } catch(error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true);

      const userUpdated = user; // recebe o user
      userUpdated.name = data.name; // nome recebe nome

      await api.put('/users', data); //envia os dados e o bckend faz validação da senha

      await updateUserProfile(userUpdated); // aqui recebe as nv atualizações

      toast.show({
        title: "Perfil atualizado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
    } catch(error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível atualizer os dados, tente novamente mais tarde!";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title='Perfil' />
      <ScrollView contentContainerStyle={{ paddingBottom: 50, }}>
        <Center mt={6} px={10}>
          { photoIsLoading ?
            <Skeleton 
              w={PHOTO_SIZE} 
              h={PHOTO_SIZE} 
              rounded='full'
              startColor='gray.500'
              endColor='gray.400'
            />
            :
            <UserPhoto
              source={ user.avatar ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}`} : defaultUserPhotoImg}
              alt='Foto do usuário'
              size={PHOTO_SIZE}
            />
          }

          <TouchableOpacity onPress={handleUserPhotoSelector}>
            <Text color='green.500' fontWeight='bold' fontSize='md' mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>
          
          <Controller 
            control={control}
            name="name"
            render={({ field: { value, onChange }}) => (
              <Input 
                bg="gray.600"
                placeholder='Nome'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="email"
            render={({ field: { value, onChange }}) => (
              <Input 
                bg="gray.600"
                placeholder='E-mail'
                isDisabled
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          
          <Heading 
            color='gray.200' 
            fontSize='md' 
            mb={2} 
            alignSelf='flex-start' 
            mt={12}
          >
            Alterar senha
          </Heading>

          <Controller 
            control={control}
            name="old_password"
            render={({ field: { onChange }}) => (
              <Input 
                bg="gray.600"
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />

          <Controller 
            control={control}
            name="password"
            render={({ field: { onChange }}) => (
              <Input 
                bg="gray.600"
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="confirm_password"
            render={({ field: { onChange }}) => (
              <Input 
                bg="gray.600"
                placeholder="Confirme a nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button title="Atualizar" mt={4} onPress={handleSubmit(handleProfileUpdate)} isLoading={isUpdating} />
        </Center>
      </ScrollView>
    </VStack>
  );
}