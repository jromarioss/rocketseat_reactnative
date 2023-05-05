import { useState, useEffect, useRef } from "react";
import { Alert, FlatList, TextInput, Keyboard } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { AppError } from "@utils/AppError";

type RouteParams = {
  group: string;
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [newPLayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const navigation = useNavigation();
  const route = useRoute();

  const { group } = route.params as RouteParams;

  const newPlayNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    // para não mandar nome vazio verificação caso envie espaço ou nome em braco
    if(newPLayerName.trim().length === 0) {
      return Alert.alert("Nova pessoa", "Informe o nome da pessoa para adicionar.");
    }

    const newPlayer = { //obj com nv jogador
      name: newPLayerName,
      team,
    }

    try {
      /* manda o novo play e o group que recebe por parâmento */
      await playerAddByGroup(newPlayer, group);
      newPlayNameInputRef.current?.blur(); // tirar o focus
      Keyboard.dismiss(); // fecha o teclado
      setNewPlayerName('');
      fetchPlayersByTeam(); //e já reenderiza o nome do jogador
    } catch(error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message);
      } else {
        console.log(error);
        Alert.alert("Nova pessoa", "Não foi possível adicionar");
      }
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch(error) {
      console.log(error);
      Alert.alert("Remover pessoa", "Não foi possível remover a pessoa");
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate("groups");
    } catch(error) {
      console.log(error);
      Alert.alert("Remover turma", "Não foi possível remover a turma.")
    }
  }

  async function handleGroupRemove() {
    Alert.alert(
      "Remover",
      "Deseja remover o turma?",
      [
        { text: "Não", style: "cancel" },
        { text: "Sim", onPress: () => groupRemove() }
      ]
    );
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      //busca no storage mandando o grupo e o time selecionado
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch(error) {
      console.log(error);
      Alert.alert("Pessoas", "Não foi possível carregar as pessoas do time selecionado!");
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]); //faz a busca pelo players qnd o team é alterado

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle="adicione a gelera e separe os times"
      />

      <Form>
        <Input
          inputRef={newPlayNameInputRef}
          onChangeText={setNewPlayerName}
          value={newPLayerName} 
          placeholder="Nome do participante"
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer} // ativar com o enter
          returnKeyType="done" // ativar com o enter
        />

        <ButtonIcon 
          icon="add"
          onPress={handleAddPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter 
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumbersOfPlayers>
          {players.length}
        </NumbersOfPlayers>
      </HeaderList>

      { isLoading ? 
        <Loading /> 
        :
        <FlatList
          data={players}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <PlayerCard 
              name={item.name}
              onRemove={() => handleRemovePlayer(item.name)} 
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há pessoas neste time." />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1}
          ]}
        />
      }
      

      <Button
        onPress={handleGroupRemove}
        title="Remover Turma"
        type="SECONDARY"
      />
    </Container>
  );
};