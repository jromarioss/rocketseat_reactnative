import AsyncStorage from "@react-native-async-storage/async-storage";

import { MEALS_COLLECTION } from "../storageConfig";
import { mealStorageGetAll } from "./mealStorageGetAll";

export async function mealStorageDelete(mealName: string) {
  try {
    const storage = await mealStorageGetAll();

    const mealToRemove = storage.filter(meal => meal.name !== mealName);

    const meals = JSON.stringify(mealToRemove);
    await AsyncStorage.setItem(MEALS_COLLECTION, meals);
  } catch(error) {
    throw error;
  }
}
