import { IsNotEmpty } from 'class-validator';

export class CreateFixNeedDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  explanation: string;

  @IsNotEmpty()
  amount: number;
}
