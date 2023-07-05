/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { useRouter } from 'next/router';
import React, { cloneElement } from 'react';

import { Loader } from 'components';

interface Props {
  children: React.ReactElement;
}

export function LoggedInGuard(props: Props): React.ReactElement {
  const { children } = props;
  const router = useRouter();
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(undefined);

  React.useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const response = await fetch('/api/v1/user');

    if (response.status === 200) {
      setData(response);
      router.replace('/workspaces');
    }

    setLoading(false);
  };

  if (!isLoading && !data) {
    return cloneElement(children);
  }

  return <Loader size="md" />;
}
