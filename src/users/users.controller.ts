import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IsNumber } from 'class-validator';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { error } from 'console';

class paramDto {
  @IsNumber()
  age: number;
}

@Controller('users')
export class UsersController {
  constructor(private userSv: UsersService) {}
  @Get('/:age')
  @UsePipes(new ValidationPipe())
  Detail(@Param('age') age: paramDto) {
    return { age };
  }
  @Get()
  Hello() {
    // return this.userSv.Hello();
    // throw new NotFoundException('not found ex');
    throw new HttpException('Not Found', HttpStatus.BAD_REQUEST);
  }
}
