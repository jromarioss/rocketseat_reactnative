import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";
import { ColorProps } from "../Home/styles";

interface Props {
  type: ColorProps;
}

export const Container = styled(SafeAreaView)`
  padding: 32px;
  align-items: center;
`;

export const Image = styled.Image`
  width: 224px;
  height: 288px;
`;

export const Title = styled.Text<Props>`
  ${({ theme }) => css `
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE["2XL"]}px;
  `}
  color: ${({ theme, type }) => type === 'PRIMARY' ? theme.COLORS["GREEN-DARk"] : theme.COLORS["RED-DARk"]};
  margin-top: 100px;
`;

export const Text = styled.Text`
  ${({ theme }) => css `
    color: ${theme.COLORS["GRAY-700"]};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.LG}px;
  `}
  margin-bottom: 40px;
`;

export const TextBold = styled.Text`
  ${({ theme }) => css `
    color: ${theme.COLORS["GRAY-700"]};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.LG}px;
  `}
`;

export const Button = styled(TouchableOpacity)`
  width: 190px;
  padding: 16px;
  margin-top: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.COLORS["GRAY-600"]};
`;

export const ButtonText = styled.Text`
  ${({ theme }) => css `
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.MD}px;
  `};
`;