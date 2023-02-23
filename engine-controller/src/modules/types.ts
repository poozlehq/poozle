/** Copyright (c) 2023, Poozle, all rights reserved. **/

export enum WorkspaceEventEnum {
  'CREATE' = 'CREATE',
  'DELETE' = 'DELETE',
  'RESTART' = 'RESTART',
}

export enum ExtensionEventEnum {
  'CREATE' = 'CREATE',
  'DELETE' = 'DELETE',
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
