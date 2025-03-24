import { IsNotEmpty, IsString } from 'class-validator';
export class CreateSizeDto {
  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name must be string' })
  name: string;
  @IsNotEmpty({ message: 'value is required' })
  @IsString({ message: 'name must be string' })
  value: string;
}
