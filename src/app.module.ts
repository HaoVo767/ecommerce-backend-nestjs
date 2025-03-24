import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { LoggerModule } from './logger/logger.module';
import { StoreModule } from './store/store.module';
import { BillboardModule } from './billboard/billboard.module';
import { CategoryModule } from './category/category.module';
import { SizeModule } from './size/size.module';
import { ColorModule } from './color/color.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    DatabaseModule,
    EmployeesModule,
    LoggerModule,
    StoreModule,
    BillboardModule,
    CategoryModule,
    SizeModule,
    ColorModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
