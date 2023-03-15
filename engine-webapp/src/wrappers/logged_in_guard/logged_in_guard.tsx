/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { useRouter } from 'next/router';
import React, { cloneElement, useEffect } from 'react';

import { useGetAuthenticatedUserQuery } from 'queries/generated/graphql';

import { Loader } from 'components';

interface Props {
  children: React.ReactElement;
}

export function LoggedInGuard(props: Props): React.ReactElement {
  const { children } = props;
  const {
    data,
    loading: isLoading,
    error: isError,
  } = useGetAuthenticatedUserQuery();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isError && data.me.email) {
      router.replace('/workspaces');
    }
  }, [isLoading, isError, data]);

  if (!isLoading && isError && !data?.me.email) {
    return cloneElement(children);
  }

  return <Loader size="md" />;
}
