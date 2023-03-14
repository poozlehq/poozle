/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { useRouter } from 'next/router';
import React from 'react';

import { Loader } from 'components';

export default function Home() {
  const router = useRouter();

  React.useEffect(() => {
    router.replace(`${router.asPath}/home`);
  }, []);

  return <Loader />;
}
