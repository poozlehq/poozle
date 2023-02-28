/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { createContext } from 'react';

interface Workspace {
  slug: string;
  workspaceId: string;
}

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  Workspace: Workspace[];
  defaultWorkspace: Workspace;
  setDefaultWorkspace: (workspace: Workspace) => void;
}

export const UserContext = createContext<User>(undefined);
