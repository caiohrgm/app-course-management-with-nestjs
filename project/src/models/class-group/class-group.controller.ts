import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { ClassGroupService } from './class-group.service';
import { CreateClassGroupDto } from './dto/create-class-group.dto';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';

@Controller('class')
export class ClassGroupController {
  constructor(private classGroupService: ClassGroupService) {}

  @Post()
  @HttpCode(201)
  @UseFilters(new HttpExceptionFilter())
  create(@Body() createClassGroupDto: CreateClassGroupDto) {
    return this.classGroupService.create(createClassGroupDto);
  }
}
