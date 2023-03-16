/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const DEFAULT_EXPIRY = '365 days';

@Injectable()
export class GatewayAuthService {
  constructor(private jwtService: JwtService) {}

  async createGatewayAccessToken(workspaceId: string, days?: string) {
    const currentDate = new Date().getTime();

    const token = this.jwtService.sign(
      {
        workspaceId,
        currentDate,
      },
      {
        expiresIn: days ? days : DEFAULT_EXPIRY,
      },
    );

    return token;
  }
}
