/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { useRouter } from 'next/router';
import React, { cloneElement, useEffect } from 'react';

import { useGetUserQuery } from 'services/user/get_user';

import { Loader } from 'components';

interface Props {
  children: React.ReactElement;
}

export function LoggedInGuard(props: Props): React.ReactElement {
  const { children } = props;
  const { data, error: isError, isLoading } = useGetUserQuery();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isError && data.userId) {
      router.replace('/workspaces');
    }
  }, [isLoading, isError, data]);

  if (!isLoading && isError && !data) {
    return cloneElement(children);
  }

  return <Loader size="md" />;
}
