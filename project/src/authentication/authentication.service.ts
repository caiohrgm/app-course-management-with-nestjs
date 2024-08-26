import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HashService } from './hash/hash.service';
import { UsersService } from 'src/models/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpAuthDto } from './dto/singnup-auth.dto';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { UserEntity } from 'src/models/users/entities/user.entity';
import { EnvProps } from '../config/env';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) { }

  async signUpWithEmail({ fullName, email, password, roles }: SignUpAuthDto) {
    const hashedPassword = await this.hashService.create(password);

    const user = await this.usersService.create({
      fullName,
      email,
      hashedPassword,
      roles,
    });

    return user;
  }

  async signInWithEmail({ email, password }: SignInAuthDto): Promise<any> {
    // const user = await this._validateUser(email, password, AuthProvider.LOCAL);
    const user = await this._validateUser(email, password);
    const accessToken = await this._generateAccessToken(user);

    return { accessToken };
  }

  private async _validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user || !this.hashService.verify(password, user.hashedPassword)) {
      throw new UnauthorizedException();
    }

    return new UserEntity(user);
  }

  async _generateAccessToken(user: UserEntity) {
    const payload = { id: user.id, email: user.email };

    const secret = this.config.get(EnvProps.JWT_SECRET_ACCESS_TOKEN);

    const expiresIn = '24h';

    const accessToken = await this.jwt.signAsync(payload, {
      secret,
      expiresIn,
    });

    return accessToken;
  }
}
