/* eslint-disable prettier/prettier */
import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { SignUpAuthDto } from './dto/singnup-auth.dto';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { AuthenticationService } from './authentication.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('authentication')
@ApiTags('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) { }

  @Post('/signup')
  @HttpCode(201)
  signUpWithEmail(
    @Body()
    signUpAuthDto: SignUpAuthDto,
  ) {
    return this.authService.signUpWithEmail(signUpAuthDto);
  }

  @Post('signin')
  @HttpCode(201)
  signInWithEmail(@Body() signInAuthDto: SignInAuthDto) {
    return this.authService.signInWithEmail(signInAuthDto);
  }
}
