import { Module } from '@nestjs/common';
import { BillboardService } from './billboard.service';
import { BillboardController } from './billboard.controller';

@Module({
  controllers: [BillboardController],
  providers: [BillboardService],
})
export class BillboardModule {}
