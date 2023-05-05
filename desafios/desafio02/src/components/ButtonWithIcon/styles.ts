import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export type ColorProps = "PRIMARY" | "SECONDARY";

interface ButtonProps {
  type: ColorProps;
}

export const Container = styled(TouchableOpacity)<ButtonProps>`
  width: 100%;
  padding: 16px;
  margin-top: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme, type }) => type === "PRIMARY" ? theme.COLORS["GRAY-100"] : theme.COLORS["GRAY-700"]};
  border-radius: 6px;
  background-color: ${({ theme, type }) => type === "PRIMARY" ? theme.COLORS["GRAY-600"] : theme.COLORS["GRAY-100"]};
`;

export const ButtonText = styled.Text<ButtonProps>`
  margin-left: 12px;
  color: ${({ theme, type }) => type === "PRIMARY" ? theme.COLORS["GRAY-100"] : theme.COLORS["GRAY-700"]};
 ${({ theme }) => css `
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.MD}px;
 `}
`;

export const Icon = styled(Feather).attrs<ButtonProps>(({ theme, type }) => ({
  size: 18,
  color: type === "PRIMARY" ? theme.COLORS["GRAY-100"] : theme.COLORS["GRAY-700"],
}))``;