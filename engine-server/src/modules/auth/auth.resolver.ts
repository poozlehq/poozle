/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  Resolver,
  Mutation,
  Args,
  Parent,
  ResolveField,
  Context,
} from '@nestjs/graphql';
import { Response } from 'express';

import { User } from '@generated/user/user.model';

import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { SignupInput } from './dto/signup.input';
import { Auth, Logout } from './models/auth.model';
import { Token } from './models/token.model';

@Resolver(() => Auth)
export class AuthResolver {
  cookieOptions = {
    maxAge: 1000 * 60 * 60 * 24, // expires in a day
    // httpOnly: true, // cookie is only accessible by the server
    secure: process.env.NODE_ENV === 'production', // only transferred over https
    // sameSite: true, // only sent for requests to the same FQDN as the domain in the cookie
  };

  constructor(private readonly auth: AuthService) {}

  @Mutation(() => Auth)
  async signup(@Args('data') data: SignupInput, @Context('res') res: Response) {
    data.email = data.email.toLowerCase();
    const { accessToken, refreshToken } = await this.auth.createUser(data);

    res.cookie('token', accessToken, this.cookieOptions);

    return {
      accessToken,
      refreshToken,
    };
  }

  @Mutation(() => Auth)
  async login(
    @Args('data') { email, password }: LoginInput,
    @Context('res') res: Response,
  ) {
    const { accessToken, refreshToken } = await this.auth.login(
      email.toLowerCase(),
      password,
    );

    res.cookie('token', accessToken, this.cookieOptions);

    return {
      accessToken,
      refreshToken,
    };
  }

  @Mutation(() => Token)
  async refreshToken(@Args() { token }: RefreshTokenInput) {
    return this.auth.refreshToken(token);
  }

  @Mutation(() => Logout)
  async logout(@Context('res') res: Response) {
    const options = {
      maxAge: 1000 * 60 * 60 * 24, // expires in a day
      httpOnly: true, // cookie is only accessible by the server
      secure: process.env.NODE_ENV === 'production', // only transferred over https
      sameSite: true, // only sent for requests to the same FQDN as the domain in the cookie
    };

    res.cookie('token', '', this.cookieOptions);

    return {
      logout: true,
    };
  }

  @ResolveField('user', () => User)
  async user(@Parent() auth: Auth) {
    return await this.auth.getUserFromToken(auth.accessToken);
  }
}
