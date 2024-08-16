import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  HttpCode,
  UseFilters,
  HttpException,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../../authentication/guard/jwt.guard';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':param')
  @HttpCode(200)
  @UseFilters(HttpExceptionFilter)
  findOne(@Param() params: any) {
    const param = params.param;

    if (param.includes('@')) {
      return this.usersService.findByEmail(param);
    } else {
      return this.usersService.findById(param);
    }
  }

  @Patch(':uuid')
  @HttpCode(202)
  @UseFilters(new HttpExceptionFilter())
  update(
    @Param('uuid') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':param')
  @HttpCode(204)
  @UseFilters(new HttpExceptionFilter())
  remove(@Param() params: any) {
    const param = params.param;

    if (param.includes('@')) {
      return this.usersService.deleteByEmail(param);
    } else {
      return this.usersService.deleteById(param);
    }
  }
}
