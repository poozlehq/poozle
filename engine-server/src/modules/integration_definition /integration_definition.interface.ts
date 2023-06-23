/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Specification } from '@poozle/engine-edk';

export interface IntegrationDefinitionRequestWorkspaceIdBody {
  workspaceId: string;
}

export interface IntegrationDefinitionRequestIdBody {
  integrationDefinitionId: string;
}

export class IntegrationDefinitionSpec {
  spec: Specification;
}
