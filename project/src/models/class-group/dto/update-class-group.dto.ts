import { IsOptional, IsString } from 'class-validator';

export class UpdateClassGroupDto {
  @IsString()
  @IsOptional()
  className: string;

  @IsString()
  @IsOptional()
  courseId: string;
}
