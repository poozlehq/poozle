/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import AWSExtensionClass from './index';

runGateway(AWSExtensionClass, 8000, {
  graphiql: true,
});
