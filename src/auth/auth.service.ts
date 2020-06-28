import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';

import { IAuthSignUp, IAuthSignIn, IAuthResult } from '../common/types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    // private jwtService: JwtService
  ) {}

  async signUp ({ username, password, age }: IAuthSignUp): Promise<IAuthResult> {
    await this.userService.create({
      username,
      password,
      age,
    });

    // const payload = { username: user.username, sub: user.id };

    return {
      accessToken: 'dummy-access-token', // this.jwtService.sign(payload),
    };
  }

  async signIn ({ username, password }: IAuthSignIn): Promise<IAuthResult> {
    const user = await this.userService.findOne(undefined, {
      where: {
        username,
        password,
      }
    });

    if (!user) throw new Error('User not found');

    // const payload = { username: user.username, sub: user.id };

    return {
      accessToken: 'dummy-access-token', // this.jwtService.sign(payload),
    };
  }
}
