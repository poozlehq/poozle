/** Copyright (c) 2023, Poozle, all rights reserved. **/

export enum WorkspaceEventEnum {
  'CREATE' = 'CREATE',
  'DELETE' = 'DELETE',
  'RESTART' = 'RESTART',
  'STATUS' = 'STATUS',
}

export enum ExtensionEventEnum {
  'CREATE' = 'CREATE',
  'CREATE_WITHOUT_RESTART' = 'CREATE_WITHOUT_RESTART',
  'DELETE' = 'DELETE',
  'STATUS' = 'STATUS',
}

export interface WorkspaceRequestBody {
  event: WorkspaceEventEnum;
  slug: string;
}

export interface ExtensionRequestBody {
  event: ExtensionEventEnum;
  slug: string;
  dockerImage: string;
  workspaceSlug: string;
}
