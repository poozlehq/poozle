/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import GoogleAdminExtensionClass from './index';

runGateway(GoogleAdminExtensionClass, 8000, {
  graphiql: true,
});
