import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EnvProps } from 'src/config/env';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/models/users/users.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Coleta o BearerToken do Header da Requisição;
      ignoreExpiration: false, // Ignores the expiration of the token;
      secretOrKey: config.get(EnvProps.JWT_SECRET_ACCESS_TOKEN), // Coleta o jwt secress token do env;
    });
  }

  async validate(payload: JwtPayload) {
    console.log('Im on validation...');
    const user = await this.usersService.findById(payload.id);

    if (!user) throw new UnauthorizedException();

    return payload;
  }

  // async validate(payload: JwtPayload) {
  //   const user = await this.usersService.findById(payload.id);
  //   if (!user) throw new UnauthorizedException();
  //   return payload;
  // }
}
