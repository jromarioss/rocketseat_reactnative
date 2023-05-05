import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Groups } from "@screens/Groups";
import { Players } from "@screens/Players";
import { NewGroup } from "@screens/NewGroup";

const { Navigator, Screen } = createNativeStackNavigator(); // desestrutura o Native e Screen

export function AppRouter() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen 
        name="groups" //nome da rota para chamar
        component={Groups} //tela que ira reenderizar
      />

      <Screen
        name="new"
        component={NewGroup}
      />

      <Screen 
        name="players"
        component={Players}
      />
    </Navigator>
  );
}