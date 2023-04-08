/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import MailchimpExtensionClass from './index';

runGateway(MailchimpExtensionClass, 8000, {
  graphiql: true,
});
