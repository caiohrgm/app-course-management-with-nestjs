import {
  Body,
  ClassSerializerInterceptor,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClassGroupService } from './class-group.service';
import { CreateClassGroupDto } from './dto/create-class-group.dto';
import { UpdateClassGroupDto } from './dto/update-class-group.dto';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { JwtAuthGuard } from 'src/authentication/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('class-group')
@ApiTags('class-group')
@ApiBearerAuth('jwt')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class ClassGroupController {
  constructor(private classGroupService: ClassGroupService) {}

  @Post()
  @HttpCode(201)
  @UseFilters(new HttpExceptionFilter())
  create(@Body() createClassGroupDto: CreateClassGroupDto) {
    return this.classGroupService.create(createClassGroupDto);
  }

  @Get()
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  findAll() {
    return this.classGroupService.findAll();
  }

  @Get(':param')
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  findOne(@Param('param') param: string) {
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
      return this.classGroupService.findById(param);
    } else {
      return this.classGroupService.findByName(param);
    }
  }

  @Patch(':id')
  @HttpCode(202)
  @UseFilters(new HttpExceptionFilter())
  // eslint-disable-next-line prettier/prettier
  update(
    @Param('id') id: string,
    @Body() updateClassGroupData: UpdateClassGroupDto,
  ) {
    return this.classGroupService.update(id, updateClassGroupData);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseFilters(new HttpExceptionFilter())
  remove(@Param('id') id: any) {
    this.classGroupService.remove(id);
  }
}
