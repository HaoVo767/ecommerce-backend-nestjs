import { IsNotEmpty, IsString } from 'class-validator';
export class CreateCategoryDto {
  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name must be string' })
  name: string;
  @IsNotEmpty({ message: 'Billboard is required' })
  billboardId: string;
  // @IsNotEmpty()
  // storeId?: string;
}
