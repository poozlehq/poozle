/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { useRouter } from 'next/router';
import * as React from 'react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';

import { useGetUserQuery } from 'services/user/get_user';

import { Loader } from 'components';

export function WorkspaceHome() {
  const { data, isLoading, error: isError } = useGetUserQuery();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !isError) {
      router.replace(`/workspaces/${data.workspace[0].workspaceId}`);
    }
  }, [isLoading, isError]);

  return <Loader />;
}

export default () => {
  return (
    <SessionAuth>
      <WorkspaceHome />
    </SessionAuth>
  );
};
