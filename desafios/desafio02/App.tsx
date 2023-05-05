import { useFonts, Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { ThemeProvider } from "styled-components";

import themes from "./src/themes";

import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";


export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular, 
    Nunito_700Bold,
  });

  return (
    <ThemeProvider theme={themes}>
      {fontsLoaded ?
        <Routes />
        :
        <Loading />
      }
      
    </ThemeProvider>
  );
}