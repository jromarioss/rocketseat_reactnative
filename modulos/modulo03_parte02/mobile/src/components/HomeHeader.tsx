import { Heading, HStack, Text, VStack, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import { UserPhoto } from "./UserPhoto";
import { TouchableOpacity } from "react-native";

import { useAuth } from "@hooks/useAuth";
import defaultUserPhotoImg from "@assets/userPhotoDefault.png";
import { api } from "@services/api";

export function HomeHeader() {
  const { user, signOut } = useAuth();
  return (
    <HStack bg='gray.600' pt={16} pb={5} px={8} alignItems='center'>
      <UserPhoto
        // se tem uma foto carrega do user se ñ a defaultphoto
        source={ user.avatar ? 
          { uri: `${api.defaults.baseURL}/avatar/${user.avatar}`} 
          : 
          defaultUserPhotoImg 
        }
        alt='Imagem do usuário'
        size={16}
        mr={4}
      />

      <VStack flex={1}>
        <Text color='gray.100' fontFamily='heading' fontSize='md'>
          Olá,
        </Text>

        <Heading color='gray.100' fontFamily='heading' fontSize='md'>
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon
          as={MaterialIcons}
          name='logout'
          color='gray.200'
          size={7}
          />
      </TouchableOpacity>
    </HStack>
  );
}