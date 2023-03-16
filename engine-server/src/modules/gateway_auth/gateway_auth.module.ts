/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { SecurityConfig } from 'common/configs/config.interface';

import { GatewayAuthResolver } from './gateway_auth.resolver';
import { GatewayAuthService } from './gateway_auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security');
        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: securityConfig.expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [GatewayAuthService, GatewayAuthResolver],
  exports: [GatewayAuthService],
})
export class GatewayAuthModule {}
