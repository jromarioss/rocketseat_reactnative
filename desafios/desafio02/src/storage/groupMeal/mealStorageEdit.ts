import AsyncStorage from "@react-native-async-storage/async-storage";

import { MealDTO } from "../../dtos/MealDTO";

import { MEALS_COLLECTION } from "../storageConfig";
import { mealStorageGetAll } from "./mealStorageGetAll";

export async function mealStorageEdit(mealToEdit: MealDTO) {
  try {
    const storage = await mealStorageGetAll();

    const editMeal = storage.findIndex(meal => meal.id === mealToEdit.id);
    
    if (editMeal !== -1) {
      storage[editMeal] = mealToEdit;
      const meal = JSON.stringify(storage);
      await AsyncStorage.setItem(MEALS_COLLECTION, meal);
    }
  } catch(error) {
    throw error;
  }
}