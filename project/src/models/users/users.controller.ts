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
} from '@nestjs/common';

import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../../authentication/guard/jwt.guard';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':uuid')
  @HttpCode(200)
  findOne(@Param('uuid') id: string) {
    return this.usersService.findOneById(id);
  }

  @Patch(':uuid')
  @HttpCode(204)
  update(@Param('uuid') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':uuid')
  @HttpCode(204)
  remove(@Param('uuid') id: string) {
    return this.usersService.findOneById(id);
  }
}
