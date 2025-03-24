import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be string' })
  name: string;
  userId: string;
}
