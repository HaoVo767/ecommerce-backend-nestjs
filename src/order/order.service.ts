import { Body, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class OrderService {
  constructor(private db: DatabaseService) {}
  create(createOrderDto: CreateOrderDto, storeId: string) {
    console.log('createOrderDto ', createOrderDto);
    const { productIds, name, phone, address } = createOrderDto;
    // const products = this.db.product.findMany({
    //   where: {
    //     id: {
    //       in: productIds,
    //     },

    //   }, select: {
    //     id: true
    //   }
    // });

    const order = this.db.order.create({
      data: {
        storeId,
        name,
        phone,
        address,
        orderItems: {
          createMany: {
            data: productIds,
          },
        },
      },
    });
    return order;
  }

  findAll(storeId: string) {
    return this.db.order.findMany({
      where: {
        storeId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.db.order.findUnique({
      where: {
        id,
      },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                image: true,
                color: true,
                size: true,
              },
            },
          },
        },
      },
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
