import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { groupGetAll } from "./groupGetAll";

export async function groupCreate(newGroup: string) {
  try {
    const storedGroups = await groupGetAll(); //pega o group no storage

    const groupAlreadyExists = storedGroups.includes(newGroup);

    if(groupAlreadyExists) {
      throw new AppError("Já existe um grupo cadastrado com esse nome.");
    }
    // pega a info já armazenada, e coloca o novo groupo e converte pr texto
    const storage = JSON.stringify([...storedGroups, newGroup]);
    // setitem armazena no storage e tem 2 params 1=chave, 2 e oque quer armazenar
    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  } catch(error) {
    throw error;
  }
}