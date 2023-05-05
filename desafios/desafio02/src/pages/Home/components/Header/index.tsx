import logoDiet from "../../../../assets/logoDiet.png";

import { Container, Logo, UserImg } from "./styled";

export function Header() {
  return (
    <Container>
      <Logo source={logoDiet} />

      <UserImg source={{ uri: 'https://github.com/jromarioss.png' }}  />
    </Container>
  );
}