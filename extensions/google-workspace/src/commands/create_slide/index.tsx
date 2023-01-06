/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { open } from '@tauri-apps/api/shell';
import * as React from 'react';

export const CreateSlide = (): React.ReactElement => {
  React.useEffect(() => {
    createSlide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createSlide() {
    const baseUrl = `https://docs.google.com/presentation/create`;
    await open(baseUrl);
  }
  return <div />;
};
