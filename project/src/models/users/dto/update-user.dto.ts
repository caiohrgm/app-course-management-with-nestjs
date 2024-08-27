import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional() // From class-validator package
  fullName: string;

  @IsEmail()
  @IsOptional() // From class-validator package
  email: string;

  @IsOptional()
  classGroupId: string;

  @IsEnum(Role)
  roles: Role[];
}
