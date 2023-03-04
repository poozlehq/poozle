/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { useRouter } from 'next/router';
import * as React from 'react';

import { useGetUserQuery } from 'queries/generated/graphql';

import { Loader } from 'components';

export function WorkspaceHome() {
  const { data, loading: isLoading, error: isError } = useGetUserQuery();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !isError) {
      router.replace(`/workspaces/${data.me.Workspace[0].workspaceId}`);
    }
  }, [isLoading, isError]);

  return <Loader />;
}

export default WorkspaceHome;
