/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

/**
 * Hive service
 * TODO (harshith): Change this later remove hive org and project dependency
 */
@Injectable()
export class HiveService {
  private readonly logger = new Logger(HiveService.name);
  private endpoint: string;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    this.endpoint = configService.get('HIVE_GRAPHQL_ENDPOINT');
  }

  async login() {
    const email = this.configService.get('HIVE_EMAIL');
    const password = this.configService.get('HIVE_PASSWORD');

    this.logger.log('Logging into hive');
    const response = await lastValueFrom(
      this.httpService.post(`${this.endpoint}/auth/signin`, {
        formFields: [
          { id: 'email', value: email },
          { id: 'password', value: password },
        ],
      }),
    );

    const accessToken = response.headers['st-access-token'];
    this.logger.log('Token received');
    return accessToken as string;
  }

  async createOrganisation(name: string, accessToken: string) {
    this.logger.log('Creating organisation');
    const orgQuery = {
      query:
        'mutation CreateOrganizationMutation($input: CreateOrganizationInput!) {\n  createOrganization(input: $input) {\n    ok {\n      createdOrganizationPayload {\n        selector {\n          organization\n          __typename\n        }\n        organization {\n          cleanId\n          ...OrganizationFields\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    error {\n      inputErrors {\n        name\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\nfragment UserFields on User {\n  id\n  email\n  fullName\n  displayName\n  provider\n  isAdmin\n}\nfragment MemberFields on Member {\n  id\n  user {\n    ...UserFields\n    __typename\n  }\n  isOwner\n  organizationAccessScopes\n  projectAccessScopes\n  targetAccessScopes\n}\nfragment GetStartedWizard_GetStartedProgress on OrganizationGetStarted {\n  creatingProject\n  publishingSchema\n  checkingSchema\n  invitingMembers\n  reportingOperations\n  enablingUsageBasedBreakingChanges\n}\nfragment OrganizationFields on Organization {\n  id\n  cleanId\n  name\n  plan\n  me {\n    ...MemberFields\n    __typename\n  }\n  rateLimit {\n    retentionInDays\n    __typename\n  }\n  getStarted {\n    ...GetStartedWizard_GetStartedProgress\n    __typename\n  }\n}',
      operationName: 'CreateOrganizationMutation',
      variables: { input: { name } },
    };

    const response = await lastValueFrom(
      this.httpService.post(`${this.endpoint}/proxy`, orgQuery, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    );

    return response.data;
  }

  async createProject(name: string, organization: string, accessToken: string) {
    this.logger.log(`Creating project for ${organization}`);

    const projectQuery = {
      query:
        'mutation CreateProject_CreateProject($input: CreateProjectInput!) {\n  createProject(input: $input) {\n    ok {\n      selector {\n        organization\n        project\n        __typename\n      }\n      createdProject {\n        cleanId\n        ...ProjectFields\n        __typename\n      }\n      createdTargets {\n        ...TargetFields\n        __typename\n      }\n      __typename\n    }\n    error {\n      message\n      inputErrors {\n        name\n        buildUrl\n        validationUrl\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\nfragment ProjectFields on Project {\n  id\n  cleanId\n  name\n  type\n  gitRepository\n  registryModel\n}\nfragment TargetFields on Target {\n  id\n  cleanId\n  name\n  baseSchema\n  hasSchema\n}',
      operationName: 'CreateProject_CreateProject',
      variables: {
        input: { organization, name, type: 'SINGLE' },
      },
    };

    const response = await lastValueFrom(
      this.httpService.post(`${this.endpoint}/proxy`, projectQuery, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    );

    return response.data;
  }

  async createAccessToken(
    project: string,
    organization: string,
    accessToken: string,
  ) {
    this.logger.log(
      `Creating hive token for ${organization} and project ${project}`,
    );
    const createTokenQuery = {
      query:
        'mutation CreateAccessToken_CreateToken($input: CreateTokenInput!) {\n  createToken(input: $input) {\n    ok {\n      selector {\n        organization\n        project\n        target\n        __typename\n      }\n      createdToken {\n        ...TokenFields\n        __typename\n      }\n      secret\n      __typename\n    }\n    error {\n      message\n      __typename\n    }\n    __typename\n  }\n}\nfragment TokenFields on Token {\n  id\n  name\n  alias\n  date\n  lastUsedAt\n}',
      operationName: 'CreateAccessToken_CreateToken',
      variables: {
        input: {
          organization,
          project,
          target: 'production',
          name: 'default',
          organizationScopes: [
            'INTEGRATIONS',
            'SETTINGS',
            'MEMBERS',
            'DELETE',
            'READ',
          ],
          projectScopes: [
            'OPERATIONS_STORE_WRITE',
            'OPERATIONS_STORE_READ',
            'SETTINGS',
            'ALERTS',
            'DELETE',
            'READ',
          ],
          targetScopes: [
            'DELETE',
            'READ',
            'REGISTRY_READ',
            'REGISTRY_WRITE',
            'SETTINGS',
            'TOKENS_READ',
            'TOKENS_WRITE',
          ],
        },
      },
    };

    const response = await lastValueFrom(
      this.httpService.post(`${this.endpoint}/proxy`, createTokenQuery, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    );

    return response.data.data.createToken.ok.secret;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async post(query: any, accessToken: string) {
    const response = await lastValueFrom(
      this.httpService.post(`${this.endpoint}/proxy`, query, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    );

    return response.data;
  }
}
