import { useCallback, useState } from "react";
import { TouchableOpacity, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { ColorProps } from "../Home/styles";

import { MealDTO } from "../../dtos/MealDTO";

import { mealStorageGetAll } from "../../storage/groupMeal/mealStorageGetAll";


import { BoxText, BoxInfo, BoxTitle, Container, Icon, Info, Percentage, PercentageText, PercentageTitle, Title, DietField, InsideDiet, OutsideDiet } from "./styles";


interface StatisticsProps {
  type?: ColorProps;
}


export function Statistics({ type = "PRIMARY" }: StatisticsProps) {
  const [meals, setMeals] = useState<MealDTO[]>([]);

  const navigation = useNavigation();
  
  const onDiet = meals.filter(meals => meals.diet === true);
  const outDiet = meals.filter(meals => meals.diet === false);
  let porcent = 0;

  if (onDiet.length > outDiet.length) {
    porcent = (onDiet.length / meals.length) * 100;
  } else {
    porcent = (outDiet.length / meals.length) * 100;
  }
  
  let count = 0;

  const mealInSequence = meals.reduce((acc, item, index, array) => {
    if (item.diet === true && array[index + 1]?.diet === true) {
      count++;
    } else {
      count = 0;
    }

    if (count > acc) {
      acc = count;
    }

    return acc;
  }, 0);

  function handleBackToHome() {
    navigation.navigate('home');
  }

  async function fetchMeals() {
    try {
      const data = await mealStorageGetAll();
      setMeals(data);
    } catch(error) {
      console.log(error);
      Alert.alert("Refeições", "Não foi possível carregar as refeições");
    }
  }
  
  useFocusEffect(useCallback(() => {
    fetchMeals();
  }, []));

  return (
    <Container
      type={onDiet.length >= outDiet.length ? 'PRIMARY': 'DANGER'}
    >
      <TouchableOpacity onPress={handleBackToHome}>
        <Icon name="arrow-left" type={onDiet.length >= outDiet.length ? 'PRIMARY': 'DANGER'} />
      </TouchableOpacity>
      <Percentage>
        <PercentageTitle>
          {porcent > 0  ?
            porcent.toFixed(2)
            :
            0
          }%
        </PercentageTitle>

        {onDiet >= outDiet ?
          <PercentageText>
            das refeições dentro da dieta
          </PercentageText>
          :
          <PercentageText>
            das refeições fora da dieta
          </PercentageText>
        }
      </Percentage>

      <Info>
        <Title>
          Estatísticas gerais
        </Title>

        <BoxInfo>
          <BoxTitle>{mealInSequence}</BoxTitle>
          <BoxText>melhor sequência de pratos dentro da dieta</BoxText>
        </BoxInfo>

        <BoxInfo>
          <BoxTitle>{meals.length}</BoxTitle>
          <BoxText>refeições registradas</BoxText>
        </BoxInfo>

        <DietField>
          <InsideDiet>
            <BoxTitle>{onDiet.length}</BoxTitle>
            <BoxText>refeições dentro da dieta</BoxText>
          </InsideDiet>

          <OutsideDiet>
            <BoxTitle>{outDiet.length}</BoxTitle>
            <BoxText>refeições fora da dieta</BoxText>
          </OutsideDiet>
        </DietField>
      </Info>
    </Container>
  );
}
