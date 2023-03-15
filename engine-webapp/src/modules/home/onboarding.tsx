/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Container, Stepper } from '@mantine/core';
import * as React from 'react';

import { FirstExtension } from './first_extension';
import { Welcome } from './welcome';

export function Onboarding() {
  const [active, setActive] = React.useState(0);

  return (
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
  );
}
