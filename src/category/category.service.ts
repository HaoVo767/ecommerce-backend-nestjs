import { DatabaseService } from './../database/database.service';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private db: DatabaseService) {}
  create(createCategoryDto: CreateCategoryDto, storeId: string) {
    const { billboardId, name } = createCategoryDto;
    console.log('data ', storeId, name, billboardId);
    return this.db.category.create({
      data: {
        name,
        storeId,
        billboardId,
      },
    });
  }

  findAll(storeId: string) {
    return this.db.category.findMany({
      where: {
        storeId,
      },
      include: {
        billboard: {
          select: {
            label: true,
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(categoryId: string) {
    return this.db.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        billboard: true,
      },
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(categoryId: string) {
    return this.db.category.delete({
      where: {
        id: categoryId,
      },
    });
  }
}
