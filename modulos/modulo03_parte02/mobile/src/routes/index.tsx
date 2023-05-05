import { useTheme, Box } from "native-base";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { AuthRoutes } from "./auth.routes"; // se não está logado
import { AppRoutes } from "./app.routes"; // se está logado

import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";

export function Routes() {

  const { colors } = useTheme();
  const { user, isLoadingUserStorageData } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <Box flex={1} bg='gray.700'>
      <NavigationContainer theme={theme}>
        { user.id ? // se tem um id é pq ta logado
          <AppRoutes />
          :
          <AuthRoutes />
        }
      </NavigationContainer>
    </Box>
  );
}