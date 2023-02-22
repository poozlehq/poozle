/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { cloneElement } from 'react';

import { useGetUserQuery } from 'queries/generated/graphql';

import { Loader } from 'components';

interface Props {
  children: React.ReactElement;
}

export function GetUserData(props: Props): React.ReactElement {
  const { children } = props;
  const { loading: isLoading, error: isError } = useGetUserQuery();

  if (!isLoading && !isError) {
    return cloneElement(children);
  }

  return <Loader size="md" />;
}
