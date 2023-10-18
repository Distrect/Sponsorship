import { IsNotEmpty } from 'class-validator';
import { CityEnum } from 'src/database/user';

export class CreateChildDto {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public lastname: string;

  @IsNotEmpty()
  public dateOfBirth: Date;

  @IsNotEmpty()
  public city: CityEnum;

  @IsNotEmpty()
  public story: string;
}
