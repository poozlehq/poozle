/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { useRouter } from 'next/router';
import React from 'react';

import { Loader } from 'components';

export default function Home() {
  const router = useRouter();

  const {
    query: { workspaceId },
  } = router;

  React.useEffect(() => {
    if (workspaceId) {
      router.replace(`${router.asPath}/integration_account`);
    }
  }, [workspaceId]);

  return <Loader />;
}
