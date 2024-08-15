import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: User): Promise<UserEntity> {
    try {
      const user = await this.prisma.user.create({ data });
      return new UserEntity(user);
    } catch {
      throw new ConflictException('User with this email already registered.');
    }
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => new UserEntity(user));
  }

  async findOneById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    console.log(user);
    return user ? new UserEntity(user) : null;
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user ? new UserEntity(user) : null;
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    return new UserEntity(user);
  }
}
