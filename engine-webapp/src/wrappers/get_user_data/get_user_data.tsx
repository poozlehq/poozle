/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { cloneElement } from 'react';
import * as React from 'react';

import { useGetUserQuery } from 'services/user/get_user';

import { Loader } from 'components';

import { UserContext } from 'store/user_context';

interface Props {
  children: React.ReactElement;
}

export function GetUserData(props: Props): React.ReactElement {
  const { children } = props;
  const { data, error: isError, isLoading } = useGetUserQuery();

  if (!isLoading && !isError) {
    return (
      <UserContext.Provider value={data}>
        {cloneElement(children)}
      </UserContext.Provider>
    );
  }

  return <Loader size="md" />;
}
