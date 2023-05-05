import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { ColorProps } from "../Home/styles";
import { ButtonWithIcon } from "../../components/ButtonWithIcon";

import { MealDTO } from "../../dtos/MealDTO";

import { mealStorageDelete } from "../../storage/groupMeal/mealStorageDelete";

import { AreaButton, Circle, Container, Header, Icon, Info, InfoDiet, InfoText, InfoTime, InfoTitle, Title } from "./styles";


export function Meals() {
  
  const routes = useRoute();
  const navigation = useNavigation();

  const { name, day, diet, hour, description, id } = routes.params as MealDTO;

  function handleBack() {
    navigation.navigate('home');
  }

  function handleGoToEdit() {
    navigation.navigate('editMeal', { id, day, diet, hour, name, description});
  }

  async function deleteMeal() {
    try {
      await mealStorageDelete(name);
      handleBack();
    } catch(error) {
      console.log(error);
      Alert.alert("Deletar Refeição", "Não foi possível deletar esta refeição");
    }
  }

  function handleDeleteMeal() {
    Alert.alert(
      "", "Deseja realmente excluir o registro da refeição?",
      [
        { text: "Não", style: "destructive",  },
        { text: "Sim", onPress: () => deleteMeal() }
      ]
    );
  }

  return (
    <Container type={diet ? 'PRIMARY': 'DANGER'}>
      <Header>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-left" />
        </TouchableOpacity>
        <Title>Refeição</Title>
      </Header>

      <Info>
        <InfoTitle>{name}</InfoTitle>
        <InfoText>
          {description}
        </InfoText>

        <InfoTime>Data e hora</InfoTime>
        <InfoText>
          {day} às {hour}
        </InfoText>

        {diet ?
          <InfoDiet>
            <Circle type="PRIMARY" />
            <InfoText style={{ fontSize: 14, marginBottom: 0 }}>dentro da dieta</InfoText>
          </InfoDiet>
          :
          <InfoDiet>
            <Circle type="DANGER" />
            <InfoText style={{ fontSize: 14, marginBottom: 0 }}>fora da dieta</InfoText>
          </InfoDiet>
        }

        <AreaButton>
          <ButtonWithIcon onPress={handleGoToEdit} iconName="edit-3" title="Editar refeição" />

          <ButtonWithIcon onPress={handleDeleteMeal} type="SECONDARY" iconName="trash-2" iconColor="SECONDARY" title="Excluir refeição" />  
        </AreaButton>
      </Info>
    </Container>
  );
}