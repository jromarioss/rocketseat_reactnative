import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

type FormDataProps = {
  name: string;
  email: string;
  password: string
  passwordConfirm: string;
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
  password: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos'),
  passwordConfirm: yup.string().required('Confirme a senha').oneOf([yup.ref('password'), null], 'Senha diferente'),
});

export function SignUp() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    }
  });

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSignUp({ name, email, password, passwordConfirm }: FormDataProps) {
    console.log({ name, email, password, passwordConfirm });
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} px={8} pb={16}>
        <Image
          defaultSource={BackgroundImg} //entende como padrao e carrega mais rapido
          source={BackgroundImg}
          alt='Pessoas treinando'
          resizeMode='contain'
          position='absolute'
        />

        <Center my={24}>
          <LogoSvg />

          <Text color='gray.100' fontSize='sm'>
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color='gray.100' fontSize='xl' mb={6} fontFamily='heading'>
            Crie sua Conta
          </Heading>

          <Controller 
            control={control} //pentence ao control
            name='name' //da o nome
            render={({ field: { onChange, value }}) => ( //o input aqui o fields vai a propriedades
              <Input 
                placeholder='Nome'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name='email'
            render={({ field: { onChange, value }}) => (
              <Input 
                placeholder='E-mail'
                keyboardType='email-address'
                autoCapitalize='none' // mantem tudo minusculo
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name='password'
            render={({ field: { onChange, value }}) => (
              <Input 
                placeholder='Senha'
                secureTextEntry // esconde a senha
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />
          
          <Controller 
            control={control}
            name='passwordConfirm'
            render={({ field: { onChange, value }}) => (
              <Input 
                placeholder='Confirme a senha'
                secureTextEntry // esconde a senha
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType='send'
                errorMessage={errors.passwordConfirm?.message}
              />
            )}
          />
          
          <Button 
            title='Criar e acessar' 
            onPress={handleSubmit(handleSignUp)} 
          />
        </Center>

        <Button
          onPress={handleGoBack}
          title='Voltar para o login' 
          variant='outline'
          mt={20}
        />
      </VStack>
    </ScrollView>
  );
}