import { IsAlphanumeric, IsNotEmpty } from "class-validator";

export class UpdateCategoryDto {
  @IsNotEmpty()
  @IsAlphanumeric('fr-FR')
  public name: string;
}
