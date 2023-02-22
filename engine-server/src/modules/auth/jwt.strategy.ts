/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { AuthService } from './auth.service';
import { JwtDto } from './dto/jwt.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const hasCookie = request?.cookies;

          if (hasCookie) {
            const data = request?.cookies['token'];
            if (data) {
              return data;
            }
          }

          const hasAuthorizationHeader = request.headers['authorization']
            ? typeof request.headers['authorization'] === 'string'
              ? request.headers['authorization']
              : request.headers['authorization'][0]
            : undefined;

          if (hasAuthorizationHeader) {
            return hasAuthorizationHeader.split(' ')[1];
          }
          return null;
        },
      ]),
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: JwtDto): Promise<User> {
    const user = await this.authService.validateUser(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
