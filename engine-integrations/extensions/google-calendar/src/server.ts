/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import GoogleCalendarExtensionClass from './index';

runGateway(GoogleCalendarExtensionClass, 8000, {
  graphiql: true,
});
