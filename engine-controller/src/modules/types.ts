/** Copyright (c) 2023, Poozle, all rights reserved. **/

export enum WorkspaceEventEnum {
  'CREATED' = 'CREATED',
  'DELETED' = 'DELETED',
  'CREDENTIALS_UPDATED' = 'CREDENTIALS_UPDATED',
}

export enum ExtensionEventEnum {
  'CREATED' = 'CREATED',
  'DELETED_ALL' = 'DELETED_ALL',
}

export interface WorkspaceRequestBody {
  event: WorkspaceEventEnum;
  slug: string;
}

export interface ExtensionRequestBody {
  event: ExtensionEventEnum;
  slug: string;
  dockerImage: string;
}
