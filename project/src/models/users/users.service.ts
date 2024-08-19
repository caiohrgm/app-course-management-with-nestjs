import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async findById(uuid: string): Promise<UserEntity | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: uuid },
      });
      return user ? new UserEntity(user) : null;
    } catch {
      throw new NotFoundException('No user in the database.');
    }
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? new UserEntity(user) : null;
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    return new UserEntity(user);
  }

  async deleteById(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async deleteByEmail(email: string) {
    await this.prisma.user.delete({
      where: { email },
    });
  }
}
