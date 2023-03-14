/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Container, Stepper } from '@mantine/core';
import * as React from 'react';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { AuthGuard } from 'wrappers/auth_guard';
import { GetUserData } from 'wrappers/get_user_data';

import { Header } from 'components';

import { FirstExtension } from './first_extension';
import { Welcome } from './welcome/welcome';

export function Onboarding() {
  const [active, setActive] = React.useState(0);

  return (
    <>
      <Header title="Home" />
      <Container mt="xl">
        <Stepper active={active} breakpoint="sm" radius="md" size="sm">
          <Stepper.Step label="Welcome">
            <Welcome next={() => setActive((active) => active + 1)} />
          </Stepper.Step>
          <Stepper.Step label="Connect Extension">
            <FirstExtension />
          </Stepper.Step>
        </Stepper>
      </Container>
    </>
  );
}

Onboarding.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AuthGuard>
      <GetUserData>
        <SideBarLayout>{page}</SideBarLayout>
      </GetUserData>
    </AuthGuard>
  );
};
