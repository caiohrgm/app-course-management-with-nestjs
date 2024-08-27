/* eslint-disable prettier/prettier */
import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { SignUpAuthDto } from './dto/singnup-auth.dto';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(201)
  signUpWithEmail(@Body() signUpAuthDto: SignUpAuthDto) {
    return this.authService.signUpWithEmail(signUpAuthDto);
  }

  @Post('signin')
  @HttpCode(201)
  signInWithEmail(@Body() signInAuthDto: SignInAuthDto) {
    return this.authService.signInWithEmail(signInAuthDto);
  }
}
