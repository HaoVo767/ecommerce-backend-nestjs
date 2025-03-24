import { Injectable } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SizeService {
  constructor(private db: DatabaseService) {}
  create(createSizeDto: CreateSizeDto, storeId: string) {
    const { name, value } = createSizeDto;
    return this.db.size.create({
      data: {
        storeId,
        name,
        value,
      },
    });
  }

  findAll(storeId: string) {
    return this.db.size.findMany({
      where: {
        storeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.db.size.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateSizeDto: UpdateSizeDto) {
    const { name, value } = updateSizeDto;
    return this.db.size.update({
      where: {
        id,
      },
      data: {
        name,
        value,
      },
    });
  }

  remove(id: string) {
    return this.db.size.delete({
      where: {
        id,
      },
    });
  }
}
