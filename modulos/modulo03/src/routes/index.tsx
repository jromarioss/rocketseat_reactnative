import { useTheme, Box } from 'native-base';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes'; // se não está logado
import { AppRoutes } from './app.routes'; // se está logado
import { Home } from '../screens/Home';
import { History } from '../screens/History';

export function Routes() {
  const { colors } = useTheme();
  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  return (
    <Box flex={1} bg='gray.700'>
      <NavigationContainer theme={theme}>
        <History />
      </NavigationContainer>
    </Box>
  );
}