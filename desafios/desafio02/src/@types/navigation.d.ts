import { MealDTO } from "../dtos/MealDTO";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      meals: {
        id: string;
        name: string;
        description?: string;
        day: string;
        hour: string;
        diet: boolean | undefined;
      };
      diet: {
        type: boolean;
      };
      registerMeal: undefined;
      editMeal: {
        id: string;
        name: string;
        description?: string;
        day: string;
        hour: string;
        diet: boolean | undefined;
      };
      statistics: undefined;
    }
  }
}