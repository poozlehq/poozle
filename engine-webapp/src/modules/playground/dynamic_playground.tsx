/** Copyright (c) 2023, Poozle, all rights reserved. **/
import dynamic from 'next/dynamic';

import { Loader } from 'components';

const DynamicPlaygroudCore = dynamic(
  () => import('./playground').then((mod) => mod.Playground),
  {
    loading: () => <Loader />,
  },
);

export function DynamicPlayground() {
  return <DynamicPlaygroudCore />;
}
