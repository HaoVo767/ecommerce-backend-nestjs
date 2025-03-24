import { DatabaseService } from './../database/database.service';
import { Injectable } from '@nestjs/common';
import { CreateBillboardDto } from './dto/create-billboard.dto';
import { UpdateBillboardDto } from './dto/update-billboard.dto';

@Injectable()
export class BillboardService {
  constructor(private db: DatabaseService) {}
  create({ label, imageUrl }: CreateBillboardDto, storeId: string) {
    return this.db.billboard.create({
      data: {
        label,
        imageUrl,
        storeId,
      },
    });
  }

  findAll({ storeId }: { storeId: string }) {
    return this.db.billboard.findMany({
      where: {
        storeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(billboardId: string) {
    return this.db.billboard.findUnique({
      where: {
        id: billboardId,
      },
    });
  }

  update(billboardId: string, updateBillboardDto: UpdateBillboardDto) {
    return this.db.billboard.update({
      where: {
        id: billboardId,
      },
      data: {
        label: updateBillboardDto.label,
        imageUrl: updateBillboardDto.imageUrl,
      },
    });
  }

  remove(billboardId: string) {
    return this.db.billboard.delete({
      where: {
        id: billboardId,
      },
    });
  }
}
