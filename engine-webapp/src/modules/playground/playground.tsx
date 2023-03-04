/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { useTheme } from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
import * as React from 'react';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { AuthGuard } from 'wrappers/auth_guard';

import { Loader } from 'components';

import styles from './playground.module.scss';

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

  return (
    <>
      {fetch && (
        <div className={styles.playground}>
          <GraphiQL fetcher={fetcher} />
        </div>
      )}
    </>
  );
}

Playground.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AuthGuard>
      <SideBarLayout>{page}</SideBarLayout>
    </AuthGuard>
  );
};
