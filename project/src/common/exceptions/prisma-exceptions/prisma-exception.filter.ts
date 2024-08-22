import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import {
  PrismaConnectionErrors,
  PrismaErrorCode,
  PrismaValidationErrors,
} from './prisma-error-codes.filter';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  prismaCustomLogger(message: string, code: string) {
    Logger.error(`Prisma error: ${message}, ${code}`);
  }

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    if (PrismaConnectionErrors.hasOwnProperty(exception.code)) {
      const message = PrismaConnectionErrors.getMessage(exception.code);
      this.prismaCustomLogger(message, exception.code);
    }

    if (PrismaValidationErrors.hasOwnProperty(exception.code)) {
      const message = PrismaValidationErrors.getMessage(exception.code);
      this.prismaCustomLogger(message, exception.code);

      if (exception.code === PrismaErrorCode.P2025) {
        super.catch(new NotFoundException(message), host); // Acessa o catach da classe pai BaseExceptionFilter;
      }

      super.catch(new BadRequestException(message), host);
    }
  }
}
