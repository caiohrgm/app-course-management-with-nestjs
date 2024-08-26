import { Exclude } from 'class-transformer';

export class UserEntity {
  id: string;
  fullName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  hashedPassword: string;
  
  roles: string[];
  
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
