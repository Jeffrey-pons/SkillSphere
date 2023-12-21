import { IsAlphanumeric, IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsAlphanumeric('fr-FR')
  public name: string
}
