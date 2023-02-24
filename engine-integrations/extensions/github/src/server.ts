/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import GithubExtensionClass from './index';

runGateway(GithubExtensionClass, 8000, {
  graphiql: true,
});
