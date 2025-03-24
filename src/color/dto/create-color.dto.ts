import { IsNotEmpty, IsString } from 'class-validator';

export class CreateColorDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be string' })
  name: string;
  @IsNotEmpty({ message: 'Value is required' })
  @IsString({ message: 'Value must be string' })
  value: string;
}
