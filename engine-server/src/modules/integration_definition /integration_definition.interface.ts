/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Specification } from '@poozle/engine-edk';
import { IsString } from 'class-validator';

export class IntegrationDefinitionRequestWorkspaceIdBody {
  @IsString()
  workspaceId: string;
}

export class IntegrationDefinitionRequestIdBody {
  @IsString()
  integrationDefinitionId: string;
}

export class IntegrationDefinitionSpec {
  spec: Specification;
}
