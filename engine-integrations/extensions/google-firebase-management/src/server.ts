/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import GoogleFirebaseManagementExtensionClass from './index';

runGateway(GoogleFirebaseManagementExtensionClass, 8000, {
  graphiql: true,
});
