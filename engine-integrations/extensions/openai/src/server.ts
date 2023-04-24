/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import OpenaiExtensionClass from './index';

runGateway(OpenaiExtensionClass, 8000, {
  graphiql: true,
});
