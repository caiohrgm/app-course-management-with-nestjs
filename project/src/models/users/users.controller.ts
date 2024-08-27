import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpCode,
  UseFilters,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/authentication/guard/jwt-auth.guard';
import { AuthGuard } from '../../authentication/guard/auth.guard';
import { RolesGuard } from 'src/authentication/guard/roles.guard';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth('jwt')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  // @Roles(Role.ADMIN)
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @UseGuards(AuthGuard)
  findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':param')
  // @Roles(Role.ADMIN)
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
  // @Roles(Role.STUDENT)
  @HttpCode(202)
  @UseFilters(new HttpExceptionFilter())
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.STUDENT)
  @HttpCode(204)
  @UseFilters(new HttpExceptionFilter())
  remove(@Param('id') id: any) {
    return this.usersService.deleteById(id);
  }
}
