import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  align-items:  center;
  justify-content: space-between;
`;

export const Logo = styled.Image``;

export const UserImg = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  border: 2px solid ${({ theme }) => theme.COLORS["GRAY-600"]};
`;