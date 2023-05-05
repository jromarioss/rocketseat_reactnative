export interface MealDTO {
  id: string;
  name: string;
  description?: string;
  day: string;
  hour: string;
  diet: boolean | undefined;
}