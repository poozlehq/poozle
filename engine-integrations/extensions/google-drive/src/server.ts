/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import GoogleDriveExtensionClass from './index';

runGateway(GoogleDriveExtensionClass, 8000, {
  graphiql: true,
});
