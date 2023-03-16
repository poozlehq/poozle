/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Group, Select } from '@mantine/core';
import * as React from 'react';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { AuthGuard } from 'wrappers/auth_guard';
import { GetUserData } from 'wrappers/get_user_data';

import { Header } from 'components';

import { Monitoring } from './monitoring';
import { getStatsFromAndTo } from './monitoring/monitoring.utils';

export function Home() {
  const [rpmFilter, setRpmFilter] = React.useState('Last 30 days');
  const dates = getStatsFromAndTo(rpmFilter);

  return (
    <>
      <Header title="Home" />
      <Group position="right" p="xl">
        <Select
          data={[
            'Last 30 days',
            'Last 14 days',
            'Last 7 days',
            'Last 24 hours',
            'Last hour',
          ]}
          onChange={(text) => setRpmFilter(text)}
          defaultValue={rpmFilter}
        />
      </Group>
      {/* <Onboarding /> */}
      <Monitoring dates={dates} />
    </>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AuthGuard>
      <GetUserData>
        <SideBarLayout>{page}</SideBarLayout>
      </GetUserData>
    </AuthGuard>
  );
};
