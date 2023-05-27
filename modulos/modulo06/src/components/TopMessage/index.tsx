import { useTheme } from 'styled-components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Container, Title } from './styles'

import { IconBoxProps } from '../ButtonIcon'

interface TopMessageProps {
  icon?: IconBoxProps
  title: string
}

export function TopMessage({ title, icon: Icon}: TopMessageProps) {
  const { COLORS } = useTheme()
  const insets = useSafeAreaInsets()

  const paddingTop = insets.top

  return (
    <Container style={{ paddingTop }}>
      {Icon && (
        <Icon size={18} color={COLORS.GRAY_100} />
      )}
      <Title>{title}</Title>
    </Container>
  )
}