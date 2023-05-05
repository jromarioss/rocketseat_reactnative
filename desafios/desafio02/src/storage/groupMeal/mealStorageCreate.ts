import AsyncStorage from "@react-native-async-storage/async-storage";

import { MealDTO } from "../../dtos/MealDTO";
import { AppError } from "../../utils/AppError";
import { MEALS_COLLECTION } from "../storageConfig";
import { mealStorageGetAll } from "./mealStorageGetAll";

export async function mealStorageCreate(newMeal: MealDTO) {
  try {
    const storageMeals = await mealStorageGetAll();

    const mealAlreadyExists = storageMeals.filter(meal => meal.name === newMeal.name);

    if (mealAlreadyExists.length > 0) {
      throw new AppError("Já existe uma refeição com este nome.");
    }

    const storage = JSON.stringify([...storageMeals, newMeal]);
    await AsyncStorage.setItem(MEALS_COLLECTION, storage);
  } catch(error) {
    throw(error)
  }
}
