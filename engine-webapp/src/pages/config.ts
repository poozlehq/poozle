/** Copyright (c) 2023, Poozle, all rights reserved. **/

import getConfig from 'next/config';
import Router from 'next/router';
import EmailPasswordReact from 'supertokens-auth-react/recipe/emailpassword';
import SessionReact from 'supertokens-auth-react/recipe/session';

const { publicRuntimeConfig } = getConfig();

export const frontendConfig = () => {
  const appInfo = {
    // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
    appName: 'poozle',
    apiDomain: publicRuntimeConfig.NEXT_PUBLIC_BASE_HOST,
    websiteDomain: publicRuntimeConfig.NEXT_PUBLIC_BASE_HOST,
    apiBasePath: '/api/auth',
    websiteBasePath: '/authentication/signin',
  };

  return {
    appInfo,
    recipeList: [EmailPasswordReact.init(), SessionReact.init()],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    windowHandler: (oI: any) => {
      return {
        ...oI,
        location: {
          ...oI.location,
          setHref: (href: string) => {
            Router.push(href);
          },
        },
      };
    },
  };
};
