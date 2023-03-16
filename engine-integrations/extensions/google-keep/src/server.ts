/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import GoogleKeepExtensionClass from './index';

runGateway(GoogleKeepExtensionClass, 8000, {
  graphiql: true,
});
