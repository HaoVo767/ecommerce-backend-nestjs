import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { DatabaseService } from 'src/database/database.service';
import { UpdateBillboardDto } from 'src/billboard/dto/update-billboard.dto';

@Injectable()
export class StoreService {
  constructor(private db: DatabaseService) {}
  async create(createStoreDto: CreateStoreDto) {
    const { name, userId } = createStoreDto;
    console.log({ name, userId });
    const store = await this.db.store.create({
      data: {
        name,
        userId,
      },
    });
    return store;
  }

  findAll(userId: string) {
    return this.db.store.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.db.store.findFirst({
      where: {
        id,
      },
    });
  }

  findFirstUserStore({ userId }: { userId: string }) {
    return this.db.store.findFirst({
      where: {
        userId,
      },
    });
  }

  update({ storeId, name }: { storeId: string; name: string }) {
    return this.db.store.updateMany({
      where: {
        id: storeId,
      },
      data: {
        name,
      },
    });
  }

  // updateBillboard({storeId, billboardId} : {storeId: string, billboardId: string}) {
  // return this.db.

  // }
  createBillboard(updateBillboard: UpdateBillboardDto, storeId: string) {
    return this.db.billboard.create({
      data: {
        label: updateBillboard.label,
        imageUrl: updateBillboard.imageUrl,
        storeId,
      },
    });
  }
  remove(storeId: string) {
    return this.db.store.deleteMany({
      where: {
        id: storeId,
      },
    });
  }
}
