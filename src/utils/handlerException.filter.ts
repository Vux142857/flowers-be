import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.log(exception);
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.getResponse();
      response.status(status).json({
        statusCode: status,
        message,
      });
    } else {
      console.error(exception);
      response
        .status(500)
        .json({ statusCode: 500, message: 'Internal Server Error' });
    }
  }
}
