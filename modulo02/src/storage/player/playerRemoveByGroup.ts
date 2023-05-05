import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerRemoveByGroup(playerName: string, group: string) {
  try {
    const storage = await playersGetByGroup(group); //busca o grupo no storage

    // filtra cada jogador e retorna o todos os nomes diferente
    const filtered = storage.filter(player => player.name !== playerName);
    const players = JSON.stringify(filtered); //converter o player para texto

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players);
  } catch(error) {
    throw error; //joga o error para frente
  }
}