import { Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ColorService {
  constructor(private db: DatabaseService) {}
  create(createColorDto: CreateColorDto, storeId: string) {
    const { name, value } = createColorDto;
    return this.db.color.create({
      data: {
        name,
        value,
        storeId,
      },
    });
  }

  findAll(storeId: string) {
    return this.db.color.findMany({
      where: {
        storeId,
      },
    });
  }

  findOne(id: string) {
    return this.db.color.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateColorDto: UpdateColorDto) {
    return this.db.color.update({
      where: {
        id,
      },
      data: {
        ...updateColorDto,
      },
    });
  }

  remove(id: string) {
    return this.db.color.delete({
      where: {
        id,
      },
    });
  }
}
