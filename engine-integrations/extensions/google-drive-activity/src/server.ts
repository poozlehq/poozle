/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import GoogleDriveActivityExtensionClass from './index';

runGateway(GoogleDriveActivityExtensionClass, 8000, {
  graphiql: true,
});
