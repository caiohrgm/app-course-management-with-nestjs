/* eslint-disable prettier/prettier */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const cause = exception.getResponse();
    const { name, message } = exception;
    const responseBody = {
      name,
      status,
      message,
    };

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      name: name,
      message: message,
    });

    // if (cause instanceof Object && cause.hasOwnProperty('message')) {
    //   responseBody.message = cause['message'];
    // }

    // // Log Exception
    // Logger.error(responseBody);

    // return response.status(status).json(responseBody);
  }
}
