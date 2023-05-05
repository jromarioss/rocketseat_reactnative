import { ActivityIndicatorProps } from 'react-native'

import { Container, LoadingIndicator } from "./styles";

export function Loading({ ...rest }: ActivityIndicatorProps) {
  return (
    <Container {...rest}>
      <LoadingIndicator />
    </Container>
  );
}