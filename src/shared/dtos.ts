import { IsNotEmpty } from 'class-validator';

export class ListPaginationDto {
  @IsNotEmpty()
  public page: number;

  public resultsPerPage: number;
}
