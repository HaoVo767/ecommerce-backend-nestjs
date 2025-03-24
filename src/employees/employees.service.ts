import { Injectable } from '@nestjs/common';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaClient } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(
    private prisma: PrismaClient,
    private db: DatabaseService,
  ) {}
  async create(CreateEmployeeDto: any) {
    const dataReturn = await this.db.user.create({
      data: CreateEmployeeDto,
    });
    return dataReturn;
  }

  findAll() {
    return this.db.user.findMany({});
  }

  findOne(id: number) {
    const user = this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  async remove(id: number) {
    const deletePosts = this.db.post.deleteMany({
      where: {
        authorId: id,
      },
    });
    const deleteUser = this.db.user.delete({
      where: {
        id: id,
      },
    });
    const transaction = await this.db.$transaction([deletePosts, deleteUser]);
    return transaction;
  }
}
