/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import JiraExtensionClass from './index';

runGateway(JiraExtensionClass, 8000, {
  graphiql: true,
});
