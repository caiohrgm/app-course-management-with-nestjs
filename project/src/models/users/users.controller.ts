import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':uuid')
  @HttpCode(200)
  findOne(@Param('uuid') uuid: string) {
    return 'this action return a specific user';
  }

  @Patch(':uuid')
  @HttpCode(202)
  update(@Param('uuid') uuid: string) {
    return 'this action updates a specific user';
  }

  @Delete(':uuid')
  @HttpCode(204)
  remove(@Param('uuid') uuid: string) {
    return 'this action removes a specific user';
  }
}
