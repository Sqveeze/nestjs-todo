import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';

import { ValidationService } from '../validation/validation.service';
import { AuthService } from './auth.service';
import { IAuthSignUp, IAuthSignIn, IAuthResult } from '../common/types';
import { AuthGuard } from '../auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  @Post('sign-in')
  async signIn(
    @Body() body: IAuthSignIn
  ): Promise<IAuthResult> {
    let token: IAuthResult = {
      accessToken: "",
    };

    try { // TODO: Error handler
      await this.validationService.validateSignIn({
        ...body,
      });
    } catch (e) {
      throw new HttpException(
        e.message,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      token = await this.authService.signIn({
        ...body,
      });
    } catch (e) {
      throw new HttpException(
        e.message,
        HttpStatus.BAD_REQUEST,
      );
    }

    return token;
  }

  @Post('sign-up')
  async signUp(
    @Body() body: IAuthSignUp
  ): Promise<IAuthResult> {
    let token: IAuthResult = {
      accessToken: "",
    };

    try { // TODO: Error handler
      await this.validationService.validateSignUp({
        ...body,
      });
    } catch (e) {
      throw new HttpException(
        e.message,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      token = await this.authService.signUp({
        ...body,
      });
    } catch (e) {
      throw new HttpException(
        e.message,
        HttpStatus.BAD_REQUEST,
      );
    }

    return token;
  }
}
