import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(process.env.NODE_ENV);
    console.log(process.env.DATABASE_TYPE);
    return 'Hello World!';
  }
}
