/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { useRouter } from 'next/router';
import { cloneElement, useEffect } from 'react';

import { useGetAuthenticatedUserQuery } from 'queries/generated/graphql';

import { Loader } from 'components';

interface Props {
  children: React.ReactElement;
}

export function AuthGuard(props: Props): React.ReactElement {
  const { children } = props;
  const { loading: isLoading, error: isError } = useGetAuthenticatedUserQuery();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isError) {
      logout();
    }
  }, [isLoading, isError]);

  async function logout() {
    await fetch('/api/logout');
    router.replace('/authentication/signin');
  }

  if (!isLoading && !isError) {
    return cloneElement(children);
  }

  return <Loader size="md" />;
}
