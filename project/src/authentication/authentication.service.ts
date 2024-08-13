/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { AuthProvider } from '@prisma/client';
import { HashService } from './hash/hash.service';
import { UsersService } from 'src/models/users/users.service';
import { SignUpAuthDto } from './dto/singnup-auth.dto';
// import { SignInAuthDto } from './dto/signin-auth.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly config: ConfigService,
  ) {}

  async signUpWithEmail({ fullName, email, password }: SignUpAuthDto) {
    const hashedPassword = await this.hashService.create(password);

    const user = await this.usersService.create({
      fullName,
      email,
      hashedPassword,
    });

    return user;
  }

  // async signInWithEmail({ email, password }: SignInAuthDto) {
  //   const user = await this._validateUser(email, password, AuthProvider.LOCAL);
  //   const accessToken = await this._generateAccessToken(user);
  //   return { accessToken};
  // }

  // async _validateUser(email: string, password: string, provider: AuthProvider) {
  //   const user = await this.usersService.findBy(email, provider);

  //   if (!user || !this.hashService.verify(user.hash, password)) {
  //     throw new UnauthorizedException();
  //   }

  //   return new UserEntity(user);
  // }

  // async _generateAccessToken(user: UserEntity) {
  //   const payload = { uuid: user.uuid, email: user.email };
  //   const secret = this.config.get(EnvProps.JWT_SECRET_ACCESS_TOKEN);
  //   const expiresIn = '24h';

  //   const accessToken = await this.jwt.signAsync(payload, {
  //     secret,
  //     expiresIn,
  //   });

  //   return accessToken;
  // }
}
