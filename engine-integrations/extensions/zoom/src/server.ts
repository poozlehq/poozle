/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import ZoomExtensionClass from './index';

runGateway(ZoomExtensionClass, 8000, {
  graphiql: true,
});
