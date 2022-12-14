/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { AppProps } from '@poozle/edk';
import CreateIssue from 'commands/create_issue';
import SearchIssue from 'commands/search_issue';
import * as React from 'react';

const App = ({ commandKey, specData, resetCommand }: AppProps): React.ReactElement => {
  switch (commandKey) {
    case 'search_issue':
      return <SearchIssue specData={specData} resetCommand={resetCommand} />;
    case 'create_issue':
      return <CreateIssue specData={specData} resetCommand={resetCommand} />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};

export default App;
