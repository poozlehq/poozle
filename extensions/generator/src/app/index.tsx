/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { AppProps } from '@poozle/edk';
import { JsonStringConverter } from 'commands/convert_json_string';
import { GenerateCron } from 'commands/generate_cron';
import GenerateLoremIpsum from 'commands/generate_lorem_ipsum';
import { GeneratePassword } from 'commands/generate_password';
import { GenerateUUID } from 'commands/generate_uuid';
import { ConvertEpoch } from 'commands/convert_epoch';
import * as React from 'react';

const App = ({ commandKey, resetCommand }: AppProps): React.ReactElement => {
  switch (commandKey) {
    case 'generate_password':
      return <GeneratePassword resetCommand={resetCommand} />;
    case 'generate_uuid':
      return <GenerateUUID resetCommand={resetCommand} />;
    case 'generate_lorem_ipsum':
      return <GenerateLoremIpsum resetCommand={resetCommand} />;
    case 'generate_cron':
      return <GenerateCron resetCommand={resetCommand} />;
    case 'convert_json_string':
      return <JsonStringConverter resetCommand={resetCommand} />;
    case 'convert_epoch':
      return <ConvertEpoch resetCommand={resetCommand} />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};

export default App;
