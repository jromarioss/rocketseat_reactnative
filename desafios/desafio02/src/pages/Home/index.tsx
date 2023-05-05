import { useCallback, useState } from "react";
import { TouchableOpacity, FlatList, Alert, SectionList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Header } from "./components/Header";
import { MealInfo } from "./components/MealInfo";
import { ButtonWithIcon } from "../../components/ButtonWithIcon";

import { MealDTO } from "../../dtos/MealDTO";

import { mealStorageGetAll } from "../../storage/groupMeal/mealStorageGetAll";

import { ColorProps, Container, InfoTitle, NewMeals, NewMealsTitle, Percent, PercentIcon, PercentInfo, PercentText, PercentTitle } from "./styles";

interface HomeProps {
  type?: ColorProps;
}

export function Home() {
  const [meals, setMeals] = useState<MealDTO[]>([]);

  const onDiet = meals.filter(meals => meals.diet === true);
  const outDiet = meals.filter(meals => meals.diet === false);
  let porcent = 0;

  if (onDiet.length > outDiet.length) {
    porcent = (onDiet.length / meals.length) * 100;
  } else {
    porcent = (outDiet.length / meals.length) * 100;
  }

  const sections = Object.values(
    meals.reduce((acc, item) => {
      const date = item.day;
      if (!acc[date]) {
        acc[date] = {
          title: date,
          data: []
        }
      }
      acc[date].data.push(item);
      return acc;
    }, {} as Record<string, | { title: string, data: MealDTO[]}>)
  );

  const navigation = useNavigation();

  function handleGoToStatistcs() {
    navigation.navigate("statistics");
  }

  function handleRegisterMeal() {
    navigation.navigate("registerMeal");
  }

  function handleInfoMeal(item: any) {
    navigation.navigate("meals", item);
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
    <Container>
      <Header />

      <Percent type={onDiet.length >= outDiet.length ? 'PRIMARY': 'DANGER'} >
        <PercentInfo>
          
          <PercentTitle>
            {porcent > 0  ?
              porcent.toFixed(2)
              :
              0
            }%
          </PercentTitle>
          {porcent >= 50 ?
            <PercentText>das refeições dentro da dieta</PercentText>
            :
            <PercentText>das refeições fora da dieta</PercentText>
          }
        </PercentInfo>

        <TouchableOpacity onPress={handleGoToStatistcs}>
          <PercentIcon
            type={onDiet.length >= outDiet.length  ? 'PRIMARY': 'DANGER'}
            name="arrow-up-right"
          />
        </TouchableOpacity>
      </Percent>

      <NewMeals>
        <NewMealsTitle>Refeições</NewMealsTitle>
        <ButtonWithIcon iconName="plus" title="Nova refeição" onPress={handleRegisterMeal} />
      </NewMeals>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <MealInfo 
            onPress={() => handleInfoMeal(item)} 
            name={item.name} 
            hours={item.hour}
            type={item.diet ? 'PRIMARY' : 'DANGER'} 
          />
        )}
        renderSectionHeader={({ section }) => (
        <InfoTitle>{section.title}</InfoTitle>
        )}
      />
    </Container>
  );
} 