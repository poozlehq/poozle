/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { ExtensionAccount } from '@prisma/client';

export interface ExtensionAccountRequestIdBody {
  extensionAccountId: string;
}

export interface ExtensionAccountCreateBody {
  extensionDefinitionId: string;
  extensionConfiguration?: ExtensionAccount['extensionConfiguration'];
  extensionAccountName: string;
}

export interface ExtensionAccountGetRequestBody {
  workspaceId: string;
}
