/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { useTheme } from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
import { useRouter } from 'next/router';
import * as React from 'react';
import { UserContext } from 'store/user_context';

import { Loader } from 'components';

import styles from './playground.module.scss';

const GATEWAY_HOST = process.env.NEXT_PUBLIC_GATEWAY_HOST;

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
    url: `${GATEWAY_HOST}/${currentWorkspace.slug}/graphql`,
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
