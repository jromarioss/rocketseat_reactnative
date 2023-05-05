import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";
import { ColorProps } from "../Home/styles";

interface Props {
  type: ColorProps;
}

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS["GRAY-300"]};
`;

export const Header = styled.View`
  flex-direction: row;
  padding: 0 24px;
  margin-bottom: 24px;
`;

export const Icon = styled(Feather).attrs<Props>(({ theme, type}) => ({
  size: 24,
  color: theme.COLORS["GRAY-600"],
}))``;

export const Title = styled.Text`
  flex: 1;
  ${({ theme }) => css `
    color: ${theme.COLORS["GRAY-700"]};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.XL}px;
  `};
  text-align: center;
`;

export const Form = styled.View`
  flex: 1;
  width: 100%;
  padding: 24px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  background-color: ${({ theme }) => theme.COLORS["GRAY-100"]};
`;

export const FormRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const FormRowInside = styled.View`
  width: 46%;
`;

export const Label = styled.Text`
  ${({ theme }) => css `
    color: ${theme.COLORS["GRAY-600"]};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.MD}px;
  `};
  margin: 16px 0 4px 0;
`;

export const Input = styled.TextInput`
  width: 100%;
  padding: 14px;
  justify-content: flex-start;
  border: 1px solid ${({ theme }) => theme.COLORS["GRAY-300"]};
  border-radius: 6px;
`;

export const FormButton = styled(TouchableOpacity)`
  width: 48%;
  padding: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 0;
  background-color: ${({ theme }) => theme.COLORS["GRAY-200"]};
`;

export const FormButtonGreen = styled(FormButton)`
  border: 1px solid ${({theme }) => theme.COLORS["GREEN-DARk"]};
  background-color: ${({ theme }) => theme.COLORS["GREEN-LIGHT"]};
`;

export const FormButtonRed = styled(FormButton)`
  border: 1px solid ${({theme }) => theme.COLORS["RED-DARk"]};
  background-color: ${({ theme }) => theme.COLORS["RED-LIGHT"]};
`;

export const FormButtonText = styled.Text`
  ${({ theme }) => css `
    color: ${theme.COLORS["GRAY-600"]};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.MD}px;
  `};
`;

export const Circle = styled.View<Props>`
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  margin-right: 8px;
  background-color: ${({ theme, type }) => type === "PRIMARY" ? theme.COLORS["GREEN-DARk"] : theme.COLORS["RED-DARk"]};
`;

export const AreaButton = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const Button = styled(TouchableOpacity)`
  width: 100%;
  padding: 16px;
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