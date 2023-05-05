import { TouchableOpacityProps } from "react-native";

import { CircleInfo, Container, Hora, Name, Separator } from "./styles";
import { ColorProps } from "../../styles";

interface MealInfoProps extends TouchableOpacityProps {
  name: string;
  hours: string;
  type: ColorProps;
}

export function MealInfo({ name, hours, type, ...rest }: MealInfoProps) {
  return (
    <Container {...rest}>
      <Hora>{hours}</Hora>
      <Separator />
      <Name>{name}</Name>
      <CircleInfo type={type} />
    </Container>
  );
}