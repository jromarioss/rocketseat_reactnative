import { TouchableOpacityProps } from "react-native";
import { Feather } from "@expo/vector-icons";

import { ButtonText, ColorProps, Container, Icon } from "./styles";

interface ButtonWithIconProps extends TouchableOpacityProps {
  type?: ColorProps;
  iconColor?: ColorProps;
  title: string;
  iconName: keyof typeof Feather.glyphMap;
}

export function ButtonWithIcon({ type = "PRIMARY", title, iconName, iconColor = "PRIMARY", ...rest }: ButtonWithIconProps) {
  return (
    <Container type={type} {...rest}>
      <Icon name={iconName} type={type} />
      <ButtonText type={type}>{title}</ButtonText>
    </Container>
  );
}     