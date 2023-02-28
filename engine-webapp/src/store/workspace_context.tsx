/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { createContext } from 'react';

export interface Workspace {
  slug: string;
  workspaceId: string;
}

export interface WorkspaceContextValue {
  workspaces: Workspace[];
  defaultWorkspace: Workspace;
}

export const WorkspaceContext = createContext<WorkspaceContextValue>(undefined);
