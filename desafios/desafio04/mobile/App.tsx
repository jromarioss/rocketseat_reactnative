import { Platform, StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import OneSignal from 'react-native-onesignal';

import { Routes } from '@routes/index';

import { AuthContextProvider } from '@contexts/AuthContext';

import { THEME } from './src/theme';

import { Loading } from '@components/Loading';

const oneSignalAppId = Platform.OS === 'ios' ? '' : 'f5831f36-1015-4984-b12d-8788b097c52e'
OneSignal.setAppId(oneSignalAppId)

//OneSignal.setEmail('jromario2014@gmail.com')

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}