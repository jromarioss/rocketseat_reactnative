import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { mealStorageCreate } from "../../storage/groupMeal/mealStorageCreate";

import { MealDTO } from "../../dtos/MealDTO";
import { AppError } from "../../utils/AppError";

import { Container, Form, FormRowInside, Icon, Label, Header, Title, Input, FormRow, FormButton, Circle, Button, ButtonText, AreaButton, FormButtonText, FormButtonGreen, FormButtonRed } from "./styles"; 
import { mealStorageEdit } from "../../storage/groupMeal/mealStorageEdit";

export function EditMeal({ ...rest }: TouchableOpacityProps) {
  const routes = useRoute();
  const { name, day, diet, hour, description, id } = routes.params as MealDTO;
  const [itemName, setItemName] = useState(name);
  const [itemDescription, setItemDescription] = useState(description);
  const [itemDay, setItemDay] = useState(day);
  const [itemHour, setItemHour] = useState(hour);
  const [itemDiet, setItemDiet] = useState<boolean | undefined>(diet);

  const navigation = useNavigation();
  
  function handleBackToHome() {
    navigation.navigate('home');
  }

  function handleActiveDiet(diet: boolean) {
    setItemDiet(diet);
  }

  async function handleEditMeal(id: string) {
    const item: MealDTO ={
      id: id,
      name: itemName,
      description: itemDescription,
      day: itemDay,
      hour: itemHour,
      diet: itemDiet,
    }

    await mealStorageEdit(item);
    handleBackToHome();
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
        <Title>Editar refeição</Title>
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
              onChangeText={setItemDay}
              value={itemDay}
              keyboardType="number-pad"
            />
          </FormRowInside>
          <FormRowInside>
            <Label>Hora</Label>
            <Input
              onChangeText={setItemHour}
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
          <Button onPress={() => handleEditMeal(id)}>
            <ButtonText>
              Salvar alterações
            </ButtonText>
          </Button>
        </AreaButton>
      </Form>
    </Container>
  );
}
