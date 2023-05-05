import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";

export type ColorProps = "PRIMARY" | "DANGER";

interface Props {
  type: ColorProps;
}

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 0 24px;
`;

export const Percent = styled.View<Props>`
  width: 100%;
  margin-top: 36px;
  flex-direction: row;
  border-radius: 8px;
  background-color: ${({ theme, type }) => type === "PRIMARY" ? theme.COLORS["GREEN-LIGHT"] : theme.COLORS["RED-LIGHT"]};
`;

export const PercentInfo = styled.View`
  flex: 1;
  align-items: center;
  padding: 20px 0;
`;

export const PercentTitle = styled.Text`
  ${({ theme }) => css `
    color: ${theme.COLORS["GRAY-700"]};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE["3XL"]}px;
  `}
`;

export const PercentText = styled.Text`
  ${({ theme }) => css `
    color: ${theme.COLORS["GRAY-600"]};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
  `}
`;

export const PercentIcon = styled(Feather).attrs<Props>(({ theme, type }) => ({
  size: 32,
  color: type === "PRIMARY" ? theme.COLORS["GREEN-DARk"] : theme.COLORS["RED-DARk"],
}))``;

export const NewMeals = styled.View`
  margin-top: 40px;
  margin-bottom: 32px;
`;

export const NewMealsTitle = styled.Text`
  ${({ theme }) => css `
      color: ${theme.COLORS["GRAY-700"]};
      font-size: ${theme.FONT_SIZE.XL}px;
      font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`;

export const InfoTitle = styled.Text`
  ${({ theme }) => css `
      color: ${theme.COLORS["GRAY-700"]};
      font-size: ${theme.FONT_SIZE.XL}px;
      font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
  margin-bottom: 12px;
`;

export const Meals = styled.View`
  margin-top: 32px;
`;

export const MealsDate = styled.Text`
  ${({ theme }) => css `
      color: ${theme.COLORS["GRAY-700"]};
      font-size: ${theme.FONT_SIZE.XL}px;
      font-family: ${theme.FONT_FAMILY.BOLD};
  `}
  margin-bottom: 8px;
`;