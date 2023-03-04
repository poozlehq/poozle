/** Copyright (c) 2023, Poozle, all rights reserved. **/
import dynamic from 'next/dynamic';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { AuthGuard } from 'wrappers/auth_guard';
import { GetUserData } from 'wrappers/get_user_data';

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

DynamicPlayground.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AuthGuard>
      <GetUserData>
        <SideBarLayout>{page}</SideBarLayout>
      </GetUserData>
    </AuthGuard>
  );
};
