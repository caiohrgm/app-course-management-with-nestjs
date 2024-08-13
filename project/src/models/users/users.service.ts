import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: User): Promise<UserEntity> {
    const user = await this.prisma.user.create({ data });
    return new UserEntity(user);
  }

  // async findAll(): Promise<UserEntity[]> {
  //   const users = await this.prisma.user.findMany();
  //   return users.map((user) => new UserEntity(user));
  // }

  // async findOne(uuid: string): Promise<UserEntity | null> {
  //   const user = await this.prisma.user.findUnique({
  //     where: { uuid },
  //   });

  //   return user ? new UserEntity(user) : null;
  // }

  // async update(uuid: string, data: UpdateUserDto) {
  //   const user = await this.prisma.user.update({
  //     where: { uuid },
  //     data,
  //   });
  //   return new UserEntity(user);
  // }
}
