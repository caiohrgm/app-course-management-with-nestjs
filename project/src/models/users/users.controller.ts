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
} from '@nestjs/common';

import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../../authentication/guard/jwt.guard';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth('jwt')
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

  @Patch(':id')
  @HttpCode(202)
  @UseFilters(new HttpExceptionFilter())
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseFilters(new HttpExceptionFilter())
  remove(@Param('id') id: any) {
    return this.usersService.deleteById(id);
  }
}
