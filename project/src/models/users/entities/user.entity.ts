import { Exclude } from 'class-transformer';

export class UserEntity {
  uuid: string;
  fullName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  hashedPassword: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
