import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DatabaseService } from 'src/database/database.service';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private db: DatabaseService) {}
  create(createProductDto: CreateProductDto, storeId: string) {
    const {
      name,
      price,
      categoryId,
      isFeatured,
      isArchived,
      sizeId,
      colorId,
      images,
    } = createProductDto;
    return this.db.product.create({
      data: {
        storeId,
        name,
        price,
        categoryId,
        isFeatured,
        isArchived,
        sizeId,
        colorId,
        image: {
          createMany: {
            data: [...images],
          },
        },
      },
    });
  }

  findAll(storeId: string) {
    return this.db.product.findMany({
      where: {
        storeId,
      },
      include: {
        category: true,
        size: true,
        color: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findByQuery(query: {
    category?: string;
    size?: string;
    color?: string;
    isFeatured?: boolean;
  }) {
    return this.db.product.findMany({
      where: {
        categoryId: query?.category,
        sizeId: query?.size,
        colorId: query?.color,
        isFeatured: query?.isFeatured,
      },
      include: {
        image: true,
        category: {
          select: {
            name: true,
            id: true,
          },
        },
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.db.product.findUnique({
      where: {
        id,
      },
      include: {
        image: true,
        category: true,
        size: true,
        color: true,
      },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const {
      name,
      price,
      categoryId,
      isFeatured,
      isArchived,
      sizeId,
      colorId,
      images,
    } = updateProductDto;
    const imageDelete = await this.db.image.deleteMany({
      where: {
        productId: id,
      },
    });
    console.log('imageDelete ', imageDelete);
    const imageUpdate = images.map((item) => {
      return { url: item.url, productId: id };
    });
    const imageCreate = await this.db.image.createMany({
      data: imageUpdate,
    });
    console.log('imageCreate ', imageCreate);
    return this.db.product.updateMany({
      where: {
        id,
      },
      data: {
        name,
        price,
        categoryId,
        isFeatured,
        isArchived,
        sizeId,
        colorId,
      },
    });
  }

  async remove(id: string) {
    const deleteImage = this.db.image.deleteMany({
      where: {
        productId: id,
      },
    });
    const deleteOrderItem = this.db.orderItems.deleteMany({
      where: {
        productId: id,
      },
    });
    const deleteProduct = this.db.product.delete({
      where: {
        id,
      },
    });
    return await this.db.$transaction([
      deleteImage,
      deleteOrderItem,
      deleteProduct,
    ]);
  }

  async removeAll() {
    // const deleteImage = this.db.image.deleteMany({});
    // const deleteProduct = this.db.product.deleteMany({});
    const deleteOrder = this.db.order.deleteMany({});
    // const deleteOrderItem = this.db.orderItems.deleteMany({});
    return this.db.order.deleteMany({});
    // return Promise.all([deleteImage, deleteProduct, deleteOrderItem]);
  }
}
