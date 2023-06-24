/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { createContext } from 'react';

interface Workspace {
  slug: string;
  workspaceId: string;
  anonymousDataCollection: boolean;
  initialSetupComplete: boolean;
}

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  userId: string;
  Workspace: Workspace[];
}

export const UserContext = createContext<User>(undefined);
