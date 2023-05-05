import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function playersGetByGroup(group: string) {
  try {
    //vai no storage e pega o grupo @ignite-tems:players-ignite
    const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`);
    //verificação se o storage tem conteúdo converte ele pra obj, se ñ faz array vazio
    const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : [];

    return players;

  } catch(error) {
    throw error;
  }
}