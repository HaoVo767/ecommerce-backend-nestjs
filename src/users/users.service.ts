import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  Hello(): { message: string } {
    return { message: 'Hello' };
  }
}
