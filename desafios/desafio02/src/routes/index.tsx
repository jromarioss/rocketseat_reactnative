import { View } from "react-native";
import { useTheme } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";

import { AppRouter } from "./app.routes";

export function Routes() {
  const { COLORS } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS["GRAY-100"] }}>
      <NavigationContainer>
        <AppRouter />
      </NavigationContainer>
    </View>
  );
}