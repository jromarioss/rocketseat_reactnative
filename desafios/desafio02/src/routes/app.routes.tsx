import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../pages/Home";
import { Meals } from "../pages/Meals";
import { Diet } from "../pages/Diet";
import { RegisterMeal } from "../pages/RegisterMeal";
import { EditMeal } from "../pages/EditMeal";
import { Statistics } from "../pages/Statistics";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRouter() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="home"
        component={Home}
      />

      <Screen 
        name="statistics"
        component={Statistics}
      />

      <Screen 
        name="registerMeal"
        component={RegisterMeal}
      />

      <Screen 
        name="editMeal"
        component={EditMeal}
      />

      <Screen 
        name="meals"
        component={Meals}
      />

      <Screen 
        name="diet"
        component={Diet}
      />
    </Navigator>
  );
}