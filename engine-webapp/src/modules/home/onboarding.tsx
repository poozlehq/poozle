/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Container } from '@mantine/core';
import * as React from 'react';

import { FirstIntegration } from './first_integration';

export function Onboarding() {
  return (
    <Container mt="xl">
      <FirstIntegration />
    </Container>
  );
}
