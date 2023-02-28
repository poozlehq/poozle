/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { AuthenticationLayout } from 'layouts/authentication_layout';
import { SideBarLayout } from 'layouts/sidebar_layout';
import { GetUserData } from 'wrappers/get_user_data';

export interface RouteConfig {
  path: string | RegExp;
  redirectIfLoggedIn?: boolean;
  protected?: boolean;
  wrappers?: React.ElementType[];
  layouts?: React.ElementType[];
}

export const routes: RouteConfig[] = [
  {
    path: '/home',
    protected: true,
    layouts: [SideBarLayout, GetUserData],
  },
  {
    path: '/playground',
    protected: true,
    layouts: [SideBarLayout, GetUserData],
  },
  {
    path: '/integrations',
    protected: true,
    layouts: [SideBarLayout, GetUserData],
  },
  {
    path: '/authentication/signin',
    redirectIfLoggedIn: true,
    layouts: [AuthenticationLayout],
  },
  {
    path: '/authentication/signup',
    redirectIfLoggedIn: true,
    layouts: [AuthenticationLayout],
  },
];
