/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { NextComponentType } from 'next';
import { Router } from 'next/router';

import { AuthGuard } from 'wrappers/auth_guard';
import { LoggedInGuard } from 'wrappers/logged_in_guard';

import { routes, RouteConfig } from './route_config';

export function configProcessor(
  router: Router,
  Component: NextComponentType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any,
) {
  const routeConfig: RouteConfig = routes.find((route: RouteConfig) => {
    if (typeof route.path === 'string') {
      return route.path === router.route;
    }
    return route.path.test(router.route);
  });

  let FinalComponent = <Component {...pageProps} />;

  if (routeConfig) {
    routeConfig.layouts?.forEach((Layout: React.ElementType) => {
      FinalComponent = <Layout>{FinalComponent}</Layout>;
    });

    routeConfig.wrappers?.forEach((Wrapper: React.ElementType) => {
      FinalComponent = <Wrapper>{FinalComponent}</Wrapper>;
    });

    if (routeConfig.protected) {
      FinalComponent = <AuthGuard>{FinalComponent}</AuthGuard>;
    }

    if (routeConfig.redirectIfLoggedIn) {
      FinalComponent = <LoggedInGuard>{FinalComponent}</LoggedInGuard>;
    }
  }

  return FinalComponent;
}
