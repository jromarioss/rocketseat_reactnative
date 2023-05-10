import { useState, useEffect } from 'react';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';

import { useTheme, Box } from 'native-base';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import * as Linking from 'expo-linking'

import { useAuth } from '@hooks/useAuth';

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { Loading } from '@components/Loading';
import { Notification } from '@components/Notification';

const linking = {
  prefixes: [
    'ignite-rn-03-ignite-gym://',
    'com.jromarioss.desafio04://',
    'exp+ignite-rn-03-ignite-gym://'
  ],
  config: {
    screens: {
      exercise: {
        path: 'exercise/:exerciseId',
        parse: {
          exerciseId: (exerciseId: string) => exerciseId
        }
      }
    }
  }
}

export function Routes() {
  const { colors } = useTheme();
  const [notification, setNotification] = useState<OSNotification>()

  const { user, isLoadingUserStorageData } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationsReceivedEvent: NotificationReceivedEvent) => {
        const response = notificationsReceivedEvent.getNotification()
        setNotification(response)
      }
    );

    return () => unsubscribe
  }, []);

  if(isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}

        {notification?.title && ( 
          <Notification data={notification} onClose={() => setNotification(undefined)} />
        )}
      </NavigationContainer>
    </Box>
  );
}
