import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

export function SignIn() {

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} px={8} pb={4}>
        <Image
          defaultSource={BackgroundImg} 
          source={BackgroundImg}
          alt='Pessoas treinando' //texto alternativo
          resizeMode='contain' //reajusta a imagem
          position='absolute' //faz começa do inicio
        />

        <Center my={24}>
          <LogoSvg />

          <Text color='gray.100' fontSize='sm'>
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color='gray.100' fontSize='xl' mb={6} fontFamily='heading'>
            Acesse sua conta
          </Heading>

          <Input 
            placeholder='E-mail'
            keyboardType='email-address' //teclado de email
            autoCapitalize='none' //mantem tudo minusculo
          />
          <Input 
            placeholder='Senha'
            secureTextEntry //esconde a senha
          />

          <Button title='Acessar' />
        </Center>

        <Center mt={24}>
          <Text 
            color='gray.100' 
            fontSize='sm'
            mb={3}
            fontFamily='body'
            >
            Ainda não tem acesso
          </Text>
          <Button
            onPress={handleNewAccount}
            title='Criar conta' 
            variant='outline' 
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}