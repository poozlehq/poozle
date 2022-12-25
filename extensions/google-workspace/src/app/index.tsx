/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { AppProps } from '@poozle/edk';
import { CreateDocument } from 'commands/create_document';
import { CreateSlide } from 'commands/create_slide';
import { CreateSpreadsheet } from 'commands/create_spreadsheet';
import * as React from 'react';

const App = ({ commandKey }: AppProps): React.ReactElement => {
  switch (commandKey) {
    case 'create_spreadsheet':
      return <CreateSpreadsheet />;
    case 'create_document':
      return <CreateDocument />;
    case 'create_slide':
      return <CreateSlide />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};

export default App;
