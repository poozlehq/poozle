import { Center } from '@mantine/core';
import * as React from 'react';

import Loader from 'ui/loader/loader';

export const CustomActionWithLoader = (): React.ReactElement => {
  return (
    <Center>
      <Loader />
    </Center>
  );
};
