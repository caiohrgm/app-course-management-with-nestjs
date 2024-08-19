import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  HttpCode,
  UseFilters,
  Param,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';

import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { JwtAuthGuard } from '../../authentication/guard/jwt.guard';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post()
  @HttpCode(201)
  @UseFilters(new HttpExceptionFilter())
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':params')
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  findOne(@Param() params: any) {
    const param = params.param;
    const tokens: string[] = param.split('-');
    const sizes: number[] = [];

    tokens.forEach((value) => {
      sizes.push(value.length);
    });

    const sum = sizes.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );

    if (sizes.length == 5 && sum == 32) {
      return this.courseService.findById(param);
    } else {
      return this.courseService.findByName(param);
    }
  }

  @Patch(':id')
  @HttpCode(202)
  @UseFilters(new HttpExceptionFilter())
  update(@Param() id: string, @Body() updateUserData: UpdateCourseDto) {
    return this.courseService.update(id, updateUserData);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseFilters(new HttpExceptionFilter())
  remove(@Param() id: string) {
    return this.courseService.remove(id);
  }
}
