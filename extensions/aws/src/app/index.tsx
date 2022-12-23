/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { AppProps } from '@poozle/edk';
import { GetCosts } from 'commands/get_billing';
import GetLambda from 'commands/get_lambda';
import * as React from 'react';

const App = ({ commandKey, specData, resetCommand }: AppProps): React.ReactElement => {
  switch (commandKey) {
    case 'aws_billing':
      return <GetCosts specData={specData} resetCommand={resetCommand} />;
    case 'search_lambda':
      return <GetLambda specData={specData} resetCommand={resetCommand} />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};

export default App;
