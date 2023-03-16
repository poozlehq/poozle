/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import GoogleSheetsExtensionClass from './index';

runGateway(GoogleSheetsExtensionClass, 8000, {
  graphiql: true,
});
