/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { FunctionEnv } from '@prisma/client';

export interface ExtensionDefinitionRequestIdBody {
  extensionDefinitionId: string;
}

export interface ExtensionDefinitionCreateBody {
  name: string;
  functionUrl: string;
  functionEnv: FunctionEnv;
  workspaceId: string;
}
