/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import LinearExtensionClass from './index';

runGateway(LinearExtensionClass, 8000, {
  graphiql: true,
});
