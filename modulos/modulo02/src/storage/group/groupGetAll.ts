import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function groupGetAll() {
  try {
    // getitem para obter as informações do storage
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION);
    // se tem algo no storage converta pra json se não retorna array vazia
    const groups: string[] = storage ? JSON.parse(storage) : [];
    
    return groups;
    
  } catch(error) {
    throw error;
  }
}