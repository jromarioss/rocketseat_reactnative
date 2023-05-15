import { forwardRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Container, Input, Label } from './styles'

interface TextAreaInputProps extends TextInputProps {
  label: string
}

const TextAreaInput = forwardRef<TextInput, TextAreaInputProps>(({ label, ...rest }, ref) => {
  const { COLORS } = useTheme()

  return (
    <Container>
      <Label>{label}</Label>
      <Input {...rest} ref={ref}
        placeholderTextColor={COLORS.GRAY_400} multiline autoCapitalize='sentences'
      />
    </Container>
  )
})

export { TextAreaInput }
