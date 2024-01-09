import { IsNotEmpty, IsOptional } from 'class-validator';

type HistoryType = 'Donation' | 'Sponosrship';

export class HistoryDTO {
  @IsNotEmpty()
  type: HistoryType;

  @IsOptional()
  userId?: number;

  @IsOptional()
  childId?: number;

  @IsOptional()
  dateRange?: [Date, Date];
}
