import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post(':storeId')
  create(
    @Param('storeId') storeId: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.create({ ...createCategoryDto }, storeId);
  }

  @Get('/findAllCategory/:storeId')
  findAll(@Param('storeId') storeId: string) {
    return this.categoryService.findAll(storeId);
  }

  @Get(':categoryId')
  findOne(@Param('categoryId') categoryId: string) {
    return this.categoryService.findOne(categoryId);
  }

  // @Patch(':categoryId')
  // update(
  //   @Param('categoryId') categoryId: string,
  //   @Body() updateCategoryDto: UpdateCategoryDto,
  // ) {
  //   return this.categoryService.update({...updateCategoryDto, catrgoryI});
  // }

  @Delete(':catgoryId')
  remove(@Param('catgoryId') catgoryId: string) {
    return this.categoryService.remove(catgoryId);
  }
}
