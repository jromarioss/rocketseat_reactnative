import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { mealStorageCreate } from "../../storage/groupMeal/mealStorageCreate";

import { MealDTO } from "../../dtos/MealDTO";
import { AppError } from "../../utils/AppError";

import { Container, Form, FormRowInside, Icon, Label, Header, Title, Input, FormRow, FormButton, Circle, Button, ButtonText, AreaButton, FormButtonText, FormButtonGreen, FormButtonRed } from "./styles"; 

export function RegisterMeal({ ...rest }: TouchableOpacityProps) {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemDay, setItemDay] = useState('');
  const [itemHour, setItemHour] = useState('');
  const [itemDiet, setItemDiet] = useState<boolean | undefined>(undefined);

  const navigation = useNavigation();
  
  function handleBackToHome() {
    navigation.navigate('home');
  }

  function handleActiveDiet(diet: boolean) {
    setItemDiet(diet);
  }

  async function handleNewMeal() {
    const phrase: string = "Preencha todos os campos";

    if (itemName.trim().length === 0) {
      return Alert.alert("Nova refeição", phrase);
    }

    if (itemDescription.trim().length === 0) {
      return Alert.alert("Nova refeição", phrase);
    }

    if (itemDay.trim().length === 0) {
      return Alert.alert("Nova refeição", phrase);
    }

    if (itemHour.trim().length === 0) {
      return Alert.alert("Nova refeição", phrase);
    }

    if (itemDiet === undefined) {
      return Alert.alert("Nova refeição", phrase);
    }

    const newMeal: MealDTO = {
      id: Math.random().toString(),
      name: itemName,
      description: itemDescription,
      day: itemDay,
      hour: itemHour,
      diet: itemDiet,
    }

    const type = itemDiet;

    try {
      await mealStorageCreate(newMeal);

      navigation.navigate('diet', { type });
    } catch(error) {
      if (error instanceof AppError) {
        Alert.alert("Nova refeição", error.message);
      } else {
        console.log(error);
        Alert.alert("Nova refeição", "Não foi possível criar uma refeição");
      }
    }
  }

  const handleDate = (text:string | any[]) => {
    let newText = '';
    let numbers = '0123456789';

    for (let i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      }
    }

    if (newText.length <= 2) {
      setItemDay(newText);
    } else if (newText.length <= 4) {
      setItemDay(newText.substring(0, 2) + '/' + newText.substring(2));
    } else if (newText.length <= 8) {
      setItemDay(newText.substring(0, 2) + '/' + newText.substring(2, 4) + '/' + newText.substring(4));
    }
  }

  const handleHour = (text:string | any[]) => {
    let newText = '';
    let numbers = '0123456789';

    for (let i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      }
    }

    if (newText.length <= 2) {
      setItemHour(newText);
    } else if (newText.length <= 4) {
      setItemHour(newText.substring(0, 2) + ':' + newText.substring(2));
    } else if (newText.length <= 8) {
      setItemHour(newText.substring(0, 2) + ':' + newText.substring(2, 4));
    }
  }

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={handleBackToHome}>
          <Icon name="arrow-left" />
        </TouchableOpacity>
        <Title>Nova refeição</Title>
      </Header>
      
      <Form>
        <Label>Nome</Label>
        <Input
          onChangeText={setItemName}
          value={itemName}
        />
        <Label>Descrição</Label>
        <Input
          style={{ height: 98 }}
          multiline={true}
          maxLength={100}
          textAlignVertical='top'
          onChangeText={setItemDescription}
          value={itemDescription}
        />
        <FormRow>
          <FormRowInside>
            <Label>Data</Label>
            <Input
              onChangeText={handleDate}
              value={itemDay}
              keyboardType="numeric"
            />
          </FormRowInside>
          <FormRowInside>
            <Label>Hora</Label>
            <Input
              onChangeText={handleHour}
              value={itemHour}
            />
          </FormRowInside>
        </FormRow>
        
        <Label>Está dentro da dieta?</Label>
        <FormRow>
          {itemDiet === true ?
            <FormButtonGreen {...rest} onPress={() => handleActiveDiet(true)}>
              <Circle type="PRIMARY" />
              <FormButtonText>Sim</FormButtonText>
            </FormButtonGreen>
            :
            <FormButton {...rest} onPress={() => handleActiveDiet(true)}>
              <Circle type="PRIMARY" />
              <FormButtonText>Sim</FormButtonText>
            </FormButton>
          }

          {itemDiet === false ?
            <FormButtonRed {...rest} onPress={() => handleActiveDiet(false)}>
              <Circle type="DANGER" />
              <FormButtonText>Não</FormButtonText>
            </FormButtonRed>
            :
            <FormButton {...rest} onPress={() => handleActiveDiet(false)}>
              <Circle type="DANGER" />
              <FormButtonText>Não</FormButtonText>
            </FormButton>
          }
        </FormRow>

        <AreaButton>
          <Button onPress={handleNewMeal}>
            <ButtonText>
              Cadastrar refeição
            </ButtonText>
          </Button>
        </AreaButton>
      </Form>
    </Container>
  );
}
