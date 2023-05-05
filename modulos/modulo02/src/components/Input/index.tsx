import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

import { Container } from "./styles";

// tipagem de limpa o input
type Props = TextInputProps & {
  inputRef?: React.RefObject<TextInput>;
}

export function Input({ inputRef ,...rest}: Props) {
  const { COLORS } = useTheme();

  return (
    <Container
      ref={inputRef} // limpa o input
      placeholderTextColor={COLORS.GRAY_300}
      {...rest}
    />
  );
}