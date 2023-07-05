/* eslint-disable dot-location */
/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as simpleOauth2 from 'simple-oauth2';

import { IntegrationAccountService } from 'modules/integration_account/integration_account.service';
import { IntegrationOAuthService } from 'modules/integration_oauth/integration_oauth.service';

import {
  CallbackParams,
  ProviderTemplateOAuth2,
  SessionRecord,
} from './oauth_callback.interface';
import {
  getSimpleOAuth2ClientConfig,
  getTemplate,
} from './oauth_callback.utils';

const CALLBACK_URL = 'https://server.poozle.dev/oauth/callback';

@Injectable()
export class OAuthCallbackService {
  session: Record<string, SessionRecord> = {};
  private readonly logger = new Logger(OAuthCallbackService.name);

  constructor(
    private integrationOAuthService: IntegrationOAuthService,
    private integrationAccountService: IntegrationAccountService,
  ) {}

  async getIntegrationOAuth(
    workspaceId: string,
    integrationOAuthAppId: string,
  ) {
    let integrationOAuths = [];

    try {
      integrationOAuths =
        await this.integrationOAuthService.getIntegrationOAuthsForWorkspace({
          workspaceId,
        });
    } catch (e) {
      throw new BadRequestException({
        error: 'No workspace found',
      });
    }

    if (integrationOAuths.length === 0) {
      throw new BadRequestException({
        error: 'No OAuth integration configured found',
      });
    }

    const integrationOAuth = integrationOAuths.find(
      (eA) => eA.integrationOAuthAppId === integrationOAuthAppId,
    );

    if (!integrationOAuth) {
      throw new BadRequestException('No integration Auth found');
    }

    return integrationOAuth;
  }

  async getRedirectURL(
    integrationAccountName: string,
    workspaceId: string,
    integrationOAuthAppId: string,
    externalConfig: Record<string, string>,
    redirectURL: string,
  ) {
    if (!integrationAccountName || !redirectURL) {
      throw new BadRequestException({
        error: 'Kindly pass both integrationAccountName and redirectURL',
      });
    }

    this.logger.log(
      `We got OAuth request for ${workspaceId}: ${integrationOAuthAppId}`,
    );

    const integrationOAuth = await this.getIntegrationOAuth(
      workspaceId,
      integrationOAuthAppId,
    );

    const isValidIntegrationName =
      await this.integrationAccountService.checkForIntegrationAccountName(
        integrationOAuth.workspaceId,
        integrationAccountName,
      );

    if (!isValidIntegrationName) {
      throw new BadRequestException({
        error: 'Integration name is not unique',
      });
    }

    const template = await getTemplate(integrationOAuth);

    let additionalAuthParams: Record<string, string> = {};
    if (template.authorization_params) {
      additionalAuthParams = template.authorization_params;
    }

    try {
      const simpleOAuthClient = new simpleOauth2.AuthorizationCode(
        getSimpleOAuth2ClientConfig(
          {
            client_id: integrationOAuth.clientId,
            client_secret: integrationOAuth.clientSecret,
            scopes: integrationOAuth.scopes,
          },
          template,
          externalConfig,
        ),
      );

      const uniqueId = new Date().getTime().toString(36);
      this.session[uniqueId] = {
        integrationOAuthAppId: integrationOAuth.integrationOAuthAppId,
        integrationAccountName,
        config: externalConfig,
        redirectURL,
      };

      const authorizationUri = simpleOAuthClient.authorizeURL({
        redirect_uri: CALLBACK_URL,
        scope: integrationOAuth.scopes
          .split(',')
          .join(template.scope_separator || ' '),
        state: uniqueId,
        ...additionalAuthParams,
      });

      this.logger.debug(
        `OAuth 2.0 for ${integrationOAuth.integrationOAuthAppName} - redirecting to: ${authorizationUri}`,
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

    if (
      !sessionRecord.integrationOAuthAppId ||
      !sessionRecord.integrationAccountName
    ) {
      throw new BadRequestException({
        error: 'No integrationName or integrationOAuthID found',
      });
    }

    const integrationOAuth =
      await this.integrationOAuthService.getIntegrationOAuthAppWithId({
        integrationOAuthAppId: sessionRecord.integrationOAuthAppId,
      });

    const template = (await getTemplate(
      integrationOAuth,
    )) as ProviderTemplateOAuth2;

    if (integrationOAuth === null) {
      throw new BadRequestException({
        error: 'No matching OAuth integration found',
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
        `${integrationOAuth.clientId}:${integrationOAuth.clientSecret}`,
      ).toString('base64')}`;
    }

    try {
      const simpleOAuthClient = new simpleOauth2.AuthorizationCode(
        getSimpleOAuth2ClientConfig(
          {
            client_id: integrationOAuth.clientId,
            client_secret: integrationOAuth.clientSecret,
            scopes: integrationOAuth.scopes,
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

      const integrationConfiguration = {
        ...sessionRecord.config,
        scope: tokensResponse.token.scope,
        refresh_token: tokensResponse.token.refresh_token,
        client_id: integrationOAuth.clientId,
        client_secret: integrationOAuth.clientSecret,
      };

      await this.integrationAccountService.createIntegrationAccount(
        integrationOAuth.integrationDefinitionId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        integrationConfiguration as any,
        sessionRecord.integrationAccountName,
        'OAuth2',
        integrationOAuth.workspaceId,
      );

      res.redirect(sessionRecord.redirectURL);
    } catch (e) {
      throw new BadRequestException({
        error: e.message,
      });
    }
  }
}
