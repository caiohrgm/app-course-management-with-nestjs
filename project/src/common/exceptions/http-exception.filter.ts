/* eslint-disable prettier/prettier */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const error = exception.getResponse()['error'];
    const cause = exception.getResponse();
    const { name, message } = exception;

    const responseBody = {
      message,
      error,
      statusCode,
    };
    console.log(cause['error']);

    if (cause instanceof Object && cause.hasOwnProperty('message')) {
      responseBody.message = cause['message'];
    }

    return response.status(statusCode).json(responseBody);
  }
}
