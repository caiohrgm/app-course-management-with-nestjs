import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateCourseDto {
  @IsString()
  @IsOptional()
  courseName: string;

  @IsNumber()
  @IsOptional()
  workload: number;
}
