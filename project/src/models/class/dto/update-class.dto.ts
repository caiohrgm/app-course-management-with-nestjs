import { IsString, IsOptional } from 'class-validator';

export class UpdateClassDto {
  @IsString()
  @IsOptional()
  className: string;
}
