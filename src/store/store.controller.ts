import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { UpdateBillboardDto } from 'src/billboard/dto/update-billboard.dto';

@Controller('/store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }
  @Post('/findFirstUserStore')
  findFirstUserStore(@Body() { userId }: { userId: string }) {
    return this.storeService.findFirstUserStore({ userId });
  }

  @Get('/findAll/:userId')
  findAll(@Param('userId') userId: string) {
    return this.storeService.findAll(userId);
  }
  @Post(':storeId/billboard')
  createBillboard(
    @Body() updateBillboard: UpdateBillboardDto,
    @Param('storeId') storeId: string,
  ) {
    return this.storeService.createBillboard(updateBillboard, storeId);
  }

  // @Get(':storeId/billboard/:billboardId')
  // updateBillboard(
  //   @Param('storeId') storeId: string,
  //   @Param('billboardId') billboardId: string,
  // ) {
  //   return this.storeService.updateBillboard({ storeId, billboardId });
  // }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(id);
  }

  @Patch(':storeId')
  update(
    @Param('storeId') storeId: string,
    @Body() updateStoreDto: UpdateStoreDto,
  ) {
    return this.storeService.update({ storeId, name: updateStoreDto.name });
  }

  @Delete(':storeId')
  remove(@Param('storeId') storeId: string) {
    return this.storeService.remove(storeId);
  }
}
