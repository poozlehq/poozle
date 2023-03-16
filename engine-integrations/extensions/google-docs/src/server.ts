/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import GoogleDocsExtensionClass from './index';

runGateway(GoogleDocsExtensionClass, 8000, {
  graphiql: true,
});
