import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber()
  price: number;
  @IsNotEmpty({ message: 'Category is required' })
  categoryId: string;
  @IsNotEmpty({ message: 'Featured is required' })
  isFeatured: boolean;
  @IsNotEmpty({ message: 'Archived is required' })
  isArchived: boolean;
  @IsNotEmpty({ message: 'Size is required' })
  sizeId: string;
  @IsNotEmpty({ message: 'Color is required' })
  colorId: string;
  @IsNotEmpty({ message: 'Image is required' })
  images: {
    url: string;
  }[];
}
