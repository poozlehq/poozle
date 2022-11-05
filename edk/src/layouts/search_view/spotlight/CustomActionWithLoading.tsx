/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Center } from '@mantine/core';
import * as React from 'react';

import { Loader } from 'components/loader';

export const CustomActionWithLoader = (): React.ReactElement => {
  return (
    <Center>
      <Loader />
    </Center>
  );
};
