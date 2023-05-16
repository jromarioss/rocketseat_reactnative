import { useTheme } from 'styled-components'
import { TouchableOpacityProps } from 'react-native'
import { Key, Car } from 'phosphor-react-native'

import { Container, IconBox, Message, TextHighlight } from './styles'

interface CarStatusProps extends TouchableOpacityProps {
  licencePlate?: string | null
}

export function CarStatus({ licencePlate = null, ...rest }: CarStatusProps) {
  const theme = useTheme()

  const Icon = licencePlate ? Car : Key //se tem placa usa o icon de key se ñ car
  const message = licencePlate ? 
    `Veículo ${licencePlate} em uso. ` 
    : 
    `Nenhum veículo em uso. `;
  const status = licencePlate ? `chegada. ` : `saída `;

  return(
    <Container {...rest}>
      <IconBox>
        <Icon 
          size={52} color={theme.COLORS.BRAND_LIGHT}
        />
      </IconBox>

      <Message>
        {message} 
        <TextHighlight>
          Clique aqui para registrar a {status}
        </TextHighlight>
      </Message>
    </Container>
  );
}
