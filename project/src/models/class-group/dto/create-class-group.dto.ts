import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClassGroupDto {
  @IsString()
  className: string;

  @IsString()
  @IsOptional()
  courseId: string;
}
