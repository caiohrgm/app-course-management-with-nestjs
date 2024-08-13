export interface User {
  fullName: string;
  email: string;
  hashedPassword: string;
}

// import { AuthProvider } from '@prisma/client';
// import { IsEmail, IsIn, IsNotEmpty, IsOptional } from 'class-validator';

// export class CreateUser {
//   @IsNotEmpty()
//   fullName: string;

//   @IsNotEmpty()
//   @IsEmail()
//   email: string;

//   @IsOptional()
//   hash?: string;

//   @IsOptional()
//   picture?: string;

//   @IsOptional()
//   @IsIn([Object.keys(AuthProvider)])
//   provider?: AuthProvider;
// }
