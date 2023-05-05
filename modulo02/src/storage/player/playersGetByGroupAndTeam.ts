import { playersGetByGroup } from "./playersGetByGroup";

export async function playersGetByGroupAndTeam(group: string, team: string) {
  try {
    //pega no storage os jogadores do grupo selecionado
    const storage = await playersGetByGroup(group);
    //veja quem é do time que eu quero filtrar e retorna ele
    const players = storage.filter(player => player.team === team);

    return players;
  } catch(error) {
    throw error;
  }
}