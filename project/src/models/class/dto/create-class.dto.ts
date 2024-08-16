import { IsString } from 'class-validator';

export class CreateClassDto {
  @IsString()
  className: string;
}
