/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import GoogleOauth2ExtensionClass from './index';

runGateway(GoogleOauth2ExtensionClass, 8000, {
  graphiql: true,
});
