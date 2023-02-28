/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { cloneElement } from 'react';
import * as React from 'react';
import { User, UserContext } from 'store/user_context';

import { useGetUserQuery } from 'queries/generated/graphql';

import { Loader } from 'components';

interface Props {
  children: React.ReactElement;
}

export function GetUserData(props: Props): React.ReactElement {
  const { children } = props;
  const { data, loading: isLoading, error: isError } = useGetUserQuery();
  const [defaultWorkspace, setDefaultWorkspace] = React.useState(undefined);

  React.useEffect(() => {
    if (!isLoading && !isError) {
      setDefaultWorkspace(data.me.Workspace[0]);
    }
  }, [isLoading, isError, setDefaultWorkspace]);

  if (!isLoading && !isError) {
    return (
      <UserContext.Provider
        value={
          {
            ...data.me,
            defaultWorkspace: defaultWorkspace ?? data.me.Workspace[0],
            setDefaultWorkspace,
          } as User
        }
      >
        {cloneElement(children)}
      </UserContext.Provider>
    );
  }

  return <Loader size="md" />;
}
