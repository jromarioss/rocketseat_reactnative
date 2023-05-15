import { forwardRef } from 'react'
import { TextInputProps, TextInput } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Container, Input, Label } from './styles'

interface LicensePlateInputProps extends TextInputProps {
  label: string
}

const LicensePlateInput = forwardRef<TextInput, LicensePlateInputProps>(({ label, ...rest }, ref) => {
  const { COLORS } = useTheme()

  return (
    <Container>
      <Label>{label}</Label>
      <Input {...rest} ref={ref}
        maxLength={7} autoCapitalize='characters' placeholderTextColor={COLORS.GRAY_400}
      />
    </Container>
  )
})

export { LicensePlateInput }
