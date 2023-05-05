import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";
import { ColorProps } from "../Home/styles";

interface Props {
  type: ColorProps;
}

export const Container = styled(SafeAreaView)<Props>`
  flex: 1;
  background-color: ${({ theme, type }) => type === "PRIMARY" ? theme.COLORS["GREEN-LIGHT"] : theme.COLORS["RED-LIGHT"]};
`;

export const Icon = styled(Feather).attrs<Props>(({ theme, type}) => ({
  size: 24,
  color: type === "PRIMARY" ? theme.COLORS["GREEN-DARk"] : theme.COLORS["RED-DARk"],
}))`
  margin-left: 24px;
`;

export const Percentage = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 34px;
`;

export const PercentageTitle = styled.Text`
  ${({ theme }) => css `
    color: ${theme.COLORS["GRAY-700"]};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE["3XL"]}px;
  `};
`;

export const PercentageText = styled.Text`
  ${({ theme }) => css `
    color: ${theme.COLORS["GRAY-600"]};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
  `};
`;

export const Info = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.COLORS["GRAY-100"]};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const Title = styled.Text`
  text-align: center;
  margin-top: 32px;
  margin-bottom: 24px;
  ${({ theme }) => css `
    color: ${theme.COLORS["GRAY-700"]};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.MD}px;
  `};
`;

export const BoxInfo = styled.View`
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 12px;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS["GRAY-200"]};
`;

export const BoxTitle = styled.Text`
  text-align: center;
  ${({ theme }) => css `
    color: ${theme.COLORS["GRAY-700"]};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE["2XL"]}px;
  `};
`;

export const BoxText= styled.Text`
  text-align: center;
  ${({ theme }) => css `
    color: ${theme.COLORS["GRAY-600"]};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
  `};
`;

export const DietField = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const DietBox = styled.View`
  width: 48%;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 12px;
  align-items: center;
`;

export const InsideDiet = styled(DietBox)`
  background-color: ${({ theme }) => theme.COLORS["GREEN-LIGHT"]};
`;

export const OutsideDiet = styled(DietBox)`
  background-color: ${({ theme }) => theme.COLORS["RED-LIGHT"]};
`;