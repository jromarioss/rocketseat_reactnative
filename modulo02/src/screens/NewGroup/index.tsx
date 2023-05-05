import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert } from "react-native";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";


import { Container, Content, Icon } from "./styles";

export function NewGroup() {
  const [group, setGroup] = useState(''); /* grupo da turma */

  const navigation = useNavigation();

  async function handleNew() {
    try {
      // trim remove os espaço
      if(group.trim().length === 0) { //caso crie grupo sem nome e espaço
        return Alert.alert("Novo Grupo", "Informe o nome da turma.");
      }

      await groupCreate(group);
      navigation.navigate('players', { group }); /* manda o group para rota */

    } catch(error) {

      if(error instanceof AppError) { //se o error é do tipo da classe
        Alert.alert("Novo Grupo", error.message);
      } else {
        Alert.alert("Novo Grupo", "Não foi possível criar um novo grupo.");
        console.log(error);
      }

    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight 
          title="Nova Turma"
          subtitle="crie a turma para adicionar as pessoas"
        />

        <Input 
          placeholder="Nome da turma"
          onChangeText={setGroup} /* quando mudar seta o group */
        />

        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleNew}
        />
      </Content>
    </Container>
  );
}