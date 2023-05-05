import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";

import { groupGetAll } from "./groupGetAll";

export async function groupRemoveByName(groupDeleted: string) {
  try {
    const storageGroup = await groupGetAll(); //pega o grupo no storage
    // filta o grupo pelo menos e retorna os diferente
    const groups = storageGroup.filter(group => group !== groupDeleted);
    //manda para o storage os grupo filtrado menos o removido e manda como texto
    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
    // remove os jogadores a chave de players com o grupo deleted
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`);
  } catch(error) {
    throw error;
  }
}