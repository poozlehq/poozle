/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { useTheme } from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
import { useRouter } from 'next/router';
import * as React from 'react';
import { UserContext } from 'store/user_context';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { AuthGuard } from 'wrappers/auth_guard';

import { Loader } from 'components';

import styles from './playground.module.scss';

export function Playground() {
  const { setTheme } = useTheme();
  const {
    query: { workspaceId },
  } = useRouter();
  const { Workspace } = React.useContext(UserContext);
  const currentWorkspace = Workspace.find(
    (workspace) => workspace.workspaceId === workspaceId,
  );

  const fetcher = createGraphiQLFetcher({
    url: `https://graphql.poozle.dev/${currentWorkspace.slug}/graphql`,
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
