import { IsNotEmpty, Length } from 'class-validator';
import { CityEnum, NationalityEnum } from 'src/database/user';

class IdentificationDto {
  @IsNotEmpty()
  @Length(10, 11)
  public idNumber: string;

  @IsNotEmpty()
  public nationality: NationalityEnum;
}

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

  public file: Express.Multer.File;

  public identification: IdentificationDto;
}
