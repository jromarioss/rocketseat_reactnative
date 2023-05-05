import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";
import { ColorProps } from "../Home/styles";

interface Props {
  type: ColorProps;
}

export const Container = styled(SafeAreaView)<Props>`
  flex: 1;
  background-color: ${({ theme, type }) => type === "PRIMARY" ? theme.COLORS["GREEN-LIGHT"]: theme.COLORS["RED-LIGHT"]};
`;

export const Header = styled.View`
  flex-direction: row;
  padding: 0 24px;
  margin-bottom: 24px;
`;

export const Icon = styled(Feather).attrs<Props>(({ theme }) => ({
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

export const Info = styled.View`
  flex: 1;
  width: 100%;
  padding: 24px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  background-color: ${({ theme }) => theme.COLORS["GRAY-100"]};
`;

export const InfoTitle = styled.Text`
  ${({ theme }) => css `
    color: ${theme.COLORS["GRAY-700"]};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.XL}px;
  `};
  margin-bottom: 8px;
`;

export const InfoTime = styled.Text`
  ${({ theme }) => css `
    color: ${theme.COLORS["GRAY-700"]};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.MD}px;
  `};
  margin-bottom: 8px;
`;

export const InfoText = styled.Text`
  ${({ theme }) => css `
    color: ${theme.COLORS["GRAY-700"]};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.LG}px;
  `};
  margin-bottom: 24px;
`;

export const InfoDiet = styled.View`
  width: 144px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background-color: ${({ theme }) => theme.COLORS["GRAY-200"]};
  border-radius: 9999px;
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