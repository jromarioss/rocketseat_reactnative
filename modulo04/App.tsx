import { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';
//import { tagUserEmailCreate } from './src/notifications/notificationsTags';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';

const oneSignalAppId = Platform.OS === 'ios' ? '' : 'cb9fa1b1-1a7b-462c-9fcb-60882fa877fc'
OneSignal.setAppId(oneSignalAppId);

OneSignal.promptForPushNotificationsWithUserResponse(response => {
  console.log(response);
});

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  //tagUserEmailCreate('romassplay@gmail.com')
  tagUserInfoCreate();

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationOpenedHandler((response) => {
      if (response.action) {
        console.log("vertodas");
      }
    });

    return () => unsubscribe;
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}