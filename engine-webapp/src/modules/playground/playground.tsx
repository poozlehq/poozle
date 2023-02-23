/* eslint-disable import/order */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { useTheme } from '@graphiql/react';
import { GraphiQL } from 'graphiql';

import * as React from 'react';
import { Loader } from 'components';

export function Playground() {
  const { setTheme } = useTheme();
  const fetcher = createGraphiQLFetcher({
    url: 'http://localhost:4000/graphql',
    fetch,
  });

  React.useEffect(() => {
    setTheme('light');
  }, []);

  if (!fetcher) {
    return <Loader />;
  }

  return <>{fetch && <GraphiQL fetcher={fetcher} />}</>;
}
