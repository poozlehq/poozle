/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { AppProps } from '@poozle/edk';
import { GetCosts } from 'commands/get_billing';
import GetEc2 from 'commands/get_ec2';
import GetLambda from 'commands/get_lambda';
import * as React from 'react';

const App = ({ commandKey, specData, resetCommand }: AppProps): React.ReactElement => {
  switch (commandKey) {
    case 'aws_billing':
      return <GetCosts specData={specData} resetCommand={resetCommand} />;
    case 'get_lambda':
      return <GetLambda specData={specData} resetCommand={resetCommand} />;
    case 'get_ec2':
      return <GetEc2 specData={specData} resetCommand={resetCommand} />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};

export default App;
