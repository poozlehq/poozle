/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { MantineProvider } from '@mantine/core';
import { AppProps, defaultColorScheme, theme } from '@poozle/edk';
import Search from 'commands/search';
import * as React from 'react';

const App = ({ commandKey, specData, resetCommand }: AppProps): React.ReactElement => {
  switch (commandKey) {
    case 'search':
      return (
        <MantineProvider
          theme={theme(defaultColorScheme)}
          inherit
          withCSSVariables
          withGlobalStyles
          withNormalizeCSS
        >
          <Search specData={specData} resetCommand={resetCommand} />;
        </MantineProvider>
      );
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};

export default App;
