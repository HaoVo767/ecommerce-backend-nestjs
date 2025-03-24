import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBillboardDto {
  @IsNotEmpty({ message: 'label is required' })
  @IsString({ message: 'label must be string' })
  label: string;
  @IsNotEmpty({ message: 'Image is required' })
  imageUrl: string;
}
