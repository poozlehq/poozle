/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { ExtensionType } from '@prisma/client';

export interface ExtensionDefinitionRequestIdBody {
  extensionDefinitionId: string;
}

export interface ExtensionDefinitionCreateBody {
  name: string;
  dockerImageTag: string;
  dockerRepository: string;
  workspaceId: string;
  extensionType: ExtensionType;
}
