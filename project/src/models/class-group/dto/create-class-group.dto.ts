import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClassGroupDto {
  @IsString()
  @IsOptional()
  courseName: string;

  @IsString()
  @IsNotEmpty()
  className: string;
}
