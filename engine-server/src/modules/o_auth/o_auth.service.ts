/* eslint-disable dot-location */
/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as simpleOauth2 from 'simple-oauth2';

import { ExtensionAccountService } from 'modules/extension_account/extension_account.service';
import { ExtensionAuthService } from 'modules/extension_auth/extension_auth.service';

import {
  CallbackParams,
  ProviderTemplateOAuth2,
  SessionRecord,
} from './o_auth.interface';
import { getSimpleOAuth2ClientConfig, getTemplate } from './o_auth.utils';

const CALLBACK_URL = 'https://server.poozle.dev/oauth/callback';

@Injectable()
export class OAuthService {
  session: Record<string, SessionRecord> = {};
  private readonly logger = new Logger(OAuthService.name);

  constructor(
    private extensionAuthService: ExtensionAuthService,
    private extensionAccountService: ExtensionAccountService,
  ) {}

  async getExtensionAuth(workspaceSlug: string, extensionAuthName: string) {
    let extensionAuths = [];

    try {
      extensionAuths =
        await this.extensionAuthService.getExtensionAuthsForWorkspaceSlug({
          slug: workspaceSlug,
        });
    } catch (e) {
      throw new BadRequestException({
        error: 'No workspace found',
      });
    }

    if (extensionAuths.length === 0) {
      throw new BadRequestException({
        error: 'No OAuth extension configured found',
      });
    }

    const extensionAuth = extensionAuths.find(
      (eA) => eA.extensionAuthName === extensionAuthName,
    );

    if (!extensionAuth) {
      throw new BadRequestException('No extension Auth found');
    }

    return extensionAuth;
  }

  async getRedirectURL(
    extensionAccountName: string,
    workspaceSlug: string,
    extensionAuthName: string,
    externalConfig: Record<string, string>,
    redirectURL: string,
  ) {
    if (!extensionAccountName || !redirectURL) {
      throw new BadRequestException({
        error: 'Kindly pass both extensionAccountName and redirectURL',
      });
    }

    this.logger.log(
      `We got OAuth request for ${workspaceSlug}: ${extensionAuthName}`,
    );

    const extensionAuth = await this.getExtensionAuth(
      workspaceSlug,
      extensionAuthName,
    );

    const isValidExtensionName =
      await this.extensionAccountService.checkForExtensionAccountName(
        extensionAuth.workspaceId,
        extensionAccountName,
      );

    if (!isValidExtensionName) {
      throw new BadRequestException({
        error: 'Extension name is not unique',
      });
    }

    const template = getTemplate(extensionAuth);

    let additionalAuthParams: Record<string, string> = {};
    if (template.authorization_params) {
      additionalAuthParams = template.authorization_params;
    }

    try {
      const simpleOAuthClient = new simpleOauth2.AuthorizationCode(
        getSimpleOAuth2ClientConfig(
          {
            client_id: extensionAuth.clientId,
            client_secret: extensionAuth.clientSecret,
            scopes: extensionAuth.scopes,
          },
          template,
          externalConfig,
        ),
      );

      const uniqueId = new Date().getTime().toString(36);
      this.session[uniqueId] = {
        extensionAuthId: extensionAuth.extensionAuthId,
        extensionAccountName,
        config: externalConfig,
        redirectURL,
      };

      const authorizationUri = simpleOAuthClient.authorizeURL({
        redirect_uri: CALLBACK_URL,
        scope: extensionAuth.scopes
          .split(',')
          .join(template.scope_separator || ' '),
        state: uniqueId,
        ...additionalAuthParams,
      });

      this.logger.debug(
        `OAuth 2.0 for ${extensionAuth.extensionAuthName} - redirecting to: ${authorizationUri}`,
      );

      return {
        status: 200,
        redirectURL: authorizationUri,
      };
    } catch (e) {
      console.log(e);
      throw new BadRequestException({
        error: e.message,
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async callbackHandler(params: CallbackParams, res: any) {
    if (!params.state) {
      throw new BadRequestException({
        error: 'No state found',
      });
    }

    const sessionRecord = this.session[params.state];
    /**
     * Delete the session once it's used
     */
    delete this.session[params.state];

    if (!sessionRecord) {
      throw new BadRequestException({
        error: 'No session found',
      });
    }

    if (!sessionRecord.extensionAuthId || !sessionRecord.extensionAccountName) {
      throw new BadRequestException({
        error: 'No extensionName or extensionAuthID found',
      });
    }

    const extensionAuth = await this.extensionAuthService.getExtensionAuth({
      extensionAuthId: sessionRecord.extensionAuthId,
    });

    const template = getTemplate(extensionAuth) as ProviderTemplateOAuth2;

    if (extensionAuth === null) {
      throw new BadRequestException({
        error: 'No matching OAuth extension found',
      });
    }

    let additionalTokenParams: Record<string, string> = {};
    if (template.token_params !== undefined) {
      // We need to remove grant_type, simpleOAuth2 handles that for us
      const deepCopy = JSON.parse(JSON.stringify(template.token_params));
      additionalTokenParams = deepCopy;
    }

    const headers: Record<string, string> = {};

    if (template.token_request_auth_method === 'basic') {
      headers['Authorization'] = `Basic ${Buffer.from(
        `${extensionAuth.clientId}:${extensionAuth.clientSecret}`,
      ).toString('base64')}`;
    }

    try {
      const simpleOAuthClient = new simpleOauth2.AuthorizationCode(
        getSimpleOAuth2ClientConfig(
          {
            client_id: extensionAuth.clientId,
            client_secret: extensionAuth.clientSecret,
            scopes: extensionAuth.scopes,
          },
          template,
          sessionRecord.config,
        ),
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tokensResponse: any = await simpleOAuthClient.getToken(
        {
          code: params.code as string,
          redirect_uri: CALLBACK_URL,
          ...additionalTokenParams,
        },
        {
          headers,
        },
      );

      const extensionConfiguration = {
        ...sessionRecord.config,
        scope: tokensResponse.token.scope,
        refresh_token: tokensResponse.token.refresh_token,
        client_id: extensionAuth.clientId,
        client_secret: extensionAuth.clientSecret,
      };

      await this.extensionAccountService.createExtensionAccount({
        extensionAccountName: sessionRecord.extensionAccountName,
        extensionDefinitionId: extensionAuth.extensionDefinitionId,
        workspaceId: extensionAuth.workspaceId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        extensionConfiguration: extensionConfiguration as any,
      });

      res.redirect(sessionRecord.redirectURL);
    } catch (e) {
      throw new BadRequestException({
        error: e.message,
      });
    }
  }
}
