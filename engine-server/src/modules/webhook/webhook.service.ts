/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class WebhookService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService, // private configService: ConfigService,
  ) {}

  async callback(queryParameters: any, queryBody?: any) {
    // const EXTENSION_BASE_HOST = this.configService.get('EXTENSION_BASE_HOST');
    console.log(queryParameters, queryBody);

    const state = JSON.parse(
      Buffer.from(queryParameters.state, 'base64').toString('ascii'),
    );

    const extensionAuth = await this.prisma.extensionAuth.findUnique({
      where: {
        extensionAuthId: state.extensionAuthId,
      },
      include: { extensionDefinition: true },
    });

    const oAuthBody =  `query TokenQuery {
        getTokens(
          config: {credentials: ${JSON.stringify(extensionAuth.credential)}, 
            queryParameters: ${JSON.stringify(queryParameters)}, queryBody: ${JSON.stringify(queryBody)}}
        ) {
          tokens
        }
      }`

    // const extensionUrl = `http://${extensionAuth.extensionDefinition.name
    //   .toLowerCase()
    //   .replace(/ /g, '_')}${EXTENSION_BASE_HOST}/graphql`;

    console.log(oAuthBody);
    const extensionUrl = 'http://localhost:8000/graphql';

    const response = await lastValueFrom(
      this.httpService.post(extensionUrl, oAuthBody, {
        headers: { 'Content-Type': 'application/graphql' },
      }),
    );

    console.log(response.data);

    // this.prisma.extensionAccount.create({
    //   data: {
    //     name: extensionAuth.extensionDefinition.name,
    //     workspaceId: state.workspaceId,
    //     extensionAccountName: state.extensionAccountName,
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     extensionConfiguration:
    //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //       response.data.data.getTokens.tokens as any,
    //     extensionDefinitionId: extensionAuth.extensionDefinitionId,
    //   },
    // });
  }
}
