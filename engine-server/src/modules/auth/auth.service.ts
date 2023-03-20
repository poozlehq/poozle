/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
} from 'unique-names-generator';

import { SecurityConfig } from 'common/configs/config.interface';
import { EVENT_TYPES } from 'common/constants';

import { AnalyticsService } from 'modules/analytics/analytics.service';
import { HiveService } from 'modules/hive/hive.service';

import { SignupInput } from './dto/signup.input';
import { Token } from './models/token.model';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly analyticsService: AnalyticsService,
    private readonly configService: ConfigService,
    private readonly hiveService: HiveService,
  ) {}

  async createUser(payload: SignupInput): Promise<Token> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password,
    );

    try {
      const randomName: string = uniqueNamesGenerator({
        dictionaries: [adjectives, colors],
        separator: '-',
      }); // big_red

      const user = await this.prisma.user.create({
        data: {
          ...payload,
          password: hashedPassword,
          Workspace: {
            create: {
              slug: randomName,
            },
          },
        },
        include: {
          Workspace: true,
        },
      });

      /**
       * Create Hive organisation and project for this user and workspace
       * TODO (harshith): Change this later remove hive org and project dependency
       */
      const accessToken = await this.hiveService.login();
      await this.hiveService.createOrganisation(user.userId, accessToken);
      await this.hiveService.createProject(
        randomName,
        user.userId,
        accessToken,
      );
      const hiveToken = await this.hiveService.createAccessToken(
        randomName,
        user.userId,
        accessToken,
      );
      await this.prisma.gateway.create({
        data: {
          hiveToken,
          workspaceId: user.Workspace[0].workspaceId,
        },
      });
      /**
       * Replace the above
       */

      /** Track */
      this.analyticsService.track(payload.email, EVENT_TYPES.NEW_USER);

      return this.generateTokens({
        userId: user.userId,
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${payload.email} already used.`);
      }
      throw new Error(e);
    }
  }

  async login(email: string, password: string): Promise<Token> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    return this.generateTokens({
      userId: user.userId,
    });
  }

  validateUser(userId: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { userId },
      include: { Workspace: true },
    });
  }

  getUserFromToken(token: string): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userId = (this.jwtService.decode(token) as any)['userId'];
    return this.prisma.user.findUnique({
      where: { userId },
      include: { Workspace: true },
    });
  }

  generateTokens(payload: { userId: string }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { userId: string }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { userId: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    });
  }

  refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      return this.generateTokens({
        userId,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
