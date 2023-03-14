/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Title, Text, Stack } from '@mantine/core';

import { WelcomeForm } from './welcome_form';

interface WelcomeProps {
  next: () => void;
}

export function Welcome({ next }: WelcomeProps) {
  return (
    <div>
      <Stack mt="xl" spacing={1}>
        <Title order={1} align="center">
          👋 Welcome to Poozle!
        </Title>

        <Text align="center" m={0}>
          Let’s get you started under 2 minutes
        </Text>
      </Stack>

      <WelcomeForm next={next} />
    </div>
  );
}
