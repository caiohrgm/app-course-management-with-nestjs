/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

@Injectable()
export class HashService {
  create(password: string) {
    return argon.hash(password);
  }

  verify(password: string, hashedPassword: string): Promise<boolean> {
    return argon.verify(hashedPassword, password);
  }
}
