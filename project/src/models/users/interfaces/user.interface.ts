import { Role } from '@prisma/client';

export interface User {
  fullName: string;
  email: string;
  hashedPassword: string;
  roles: Role[];
}
