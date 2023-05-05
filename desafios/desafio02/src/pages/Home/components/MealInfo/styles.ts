import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";
import { ColorProps } from "../../styles";

interface Props {
  type: ColorProps;
}

export const Container = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  border: 1px solid ${({ theme }) => theme.COLORS["GRAY-400"]};
  border-radius: 6px;
`;

export const Hora = styled.Text`
  ${({ theme }) => css `
      color: ${theme.COLORS["GRAY-700"]};
      font-size: ${theme.FONT_SIZE.SM}px;
      font-family: ${theme.FONT_FAMILY.BOLD};
  `}
  margin-right: 12px;
`;

export const Separator = styled.View`
  width: 1px;
  height: 14px;
  background-color: ${({ theme }) => theme.COLORS["GRAY-400"]};
`;

export const Name = styled.Text`
  ${({ theme }) => css `
      color: ${theme.COLORS["GRAY-700"]};
      font-size: ${theme.FONT_SIZE.MD}px;
      font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
  flex: 1;
  margin-left: 12px;
`;

export const CircleInfo = styled.View<Props>`
  width: 14px;
  height: 14px;
  border-radius: 9999px;
  background-color: ${({ theme, type }) => type === "PRIMARY" ? theme.COLORS["GREEN-MID"] : theme.COLORS["RED-MID"]};
`;