import { useNavigation, useRoute } from "@react-navigation/native";

import goodImg from "../../assets/Illustration01.png";
import goodImg2 from "../../assets/Illustration02.png";

import { Button, ButtonText, Container, Title, Text, Image, TextBold } from "./styles";

interface RoutesParams {
  type: boolean;
}

export function Diet() {
  const navigation = useNavigation();
  const routes = useRoute();

  const { type } = routes.params as RoutesParams;

  function handleGoHome({}) {
    navigation.navigate("home");
  }

  return (
    <Container>
      {type ? 
        <Title type="PRIMARY">Continue assim!</Title>
        :
        <Title type="DANGER">Que pena!</Title>
      }

      {type ? 
        <Text>Você continua <TextBold>dentro da dieta.</TextBold> Muito bem!</Text>
        :
        <Text>Você <TextBold>saiu da dieta</TextBold> desta vez, mas continue se esforçando e não desista!</Text>
      }
      
      {type ?
        <Image source={goodImg} />
        :
       <Image source={goodImg2} />
      }

      <Button onPress={handleGoHome}>
        <ButtonText>
          Ir para a página inicial
        </ButtonText>
      </Button>
    </Container>
  );
}
