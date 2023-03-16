/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import GoogleApiGatewayExtensionClass from './index';

runGateway(GoogleApiGatewayExtensionClass, 8000, {
  graphiql: true,
});
