import AsyncStorage from "@react-native-async-storage/async-storage";

import { MEALS_COLLECTION } from "../storageConfig";

import { MealDTO } from "../../dtos/MealDTO";

export async function mealStorageGetAll() {
  try {
    const storage = await AsyncStorage.getItem(MEALS_COLLECTION);

    const meals: MealDTO[] = storage ? JSON.parse(storage) : [];
    
    return meals;
  } catch(error) {
    throw error;
  }
}