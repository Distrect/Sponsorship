import { IsNotEmpty, Length, IsNumberString } from 'class-validator';
import { CityEnum, NationalityEnum } from 'src/database/user';
import Child from 'src/database/user/child/child.entity';
import { ListPaginationDto } from 'src/shared/dtos';

class IdentificationDto {
  @IsNotEmpty()
  @IsNumberString()
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

export class UpdateChildDto extends Child {}

export class ChildPagination extends ListPaginationDto {
  public fullNameLike: string;

  public age: number;
}
