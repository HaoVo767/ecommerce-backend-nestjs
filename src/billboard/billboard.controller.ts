import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BillboardService } from './billboard.service';
import { CreateBillboardDto } from './dto/create-billboard.dto';
import { UpdateBillboardDto } from './dto/update-billboard.dto';

@Controller('billboard')
export class BillboardController {
  constructor(private readonly billboardService: BillboardService) {}

  @Post(':storeId')
  create(
    @Param('storeId') storeId: string,
    @Body() createBillboardDto: CreateBillboardDto,
  ) {
    return this.billboardService.create({ ...createBillboardDto }, storeId);
  }

  @Get('/findAllBillboard/:storeId')
  findAll(@Param('storeId') storeId: string) {
    return this.billboardService.findAll({ storeId });
  }

  @Get(':billboardId')
  findOne(@Param('billboardId') billboardId: string) {
    return this.billboardService.findOne(billboardId);
  }

  @Patch(':billboardId')
  update(
    @Param('billboardId') billboard: string,
    @Body() updateBillboardDto: UpdateBillboardDto,
  ) {
    return this.billboardService.update(billboard, updateBillboardDto);
  }

  @Delete(':billboardId')
  remove(@Param('billboardId') billboardId: string) {
    return this.billboardService.remove(billboardId);
  }
}
