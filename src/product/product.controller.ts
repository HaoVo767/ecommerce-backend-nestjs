import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post(':storeId')
  create(
    @Param('storeId') storeId: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.create(createProductDto, storeId);
  }

  @Get('/findAllProduct/:storeId')
  findAll(@Param('storeId') storeId: string) {
    return this.productService.findAll(storeId);
  }
  @Get('/findByQuery')
  findByQuery(
    @Query()
    query: {
      category?: string;
      size?: string;
      color?: string;
      isFeatured?: string;
    },
  ) {
    return this.productService.findByQuery({
      ...query,
      isFeatured:
        query?.isFeatured === undefined
          ? undefined
          : query.isFeatured === 'true'
            ? true
            : false,
    });
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
