/** Copyright (c) 2023, Poozle, all rights reserved. **/

export enum WorkspaceEventEnum {
  'CREATE' = 'CREATE',
  'DELETE' = 'DELETE',
  'RESTART' = 'RESTART',
  'STATUS' = 'STATUS',
}

export interface WorkspaceRequestBody {
  event: WorkspaceEventEnum;
  slug: string;
  workspaceId?: string;
}
