import Toast from 'react-native-toast-message'
import { NavigationContainer} from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { AppRoutes } from './app.routes'
import { TopMessage } from '../components/TopMessage'

export function Routes() {
  const insets = useSafeAreaInsets()
  return (
    <NavigationContainer>
      <AppRoutes />
      <Toast 
        config={{
          /* alterar o toast o text1 vem lá da mensagem personalizada */
          info: ({ text1 }) => <TopMessage title={String(text1)} />
        }}
        topOffset={ insets.top }
      />
    </NavigationContainer>
  )
}