/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { open } from '@tauri-apps/api/shell';
import * as React from 'react';

export const CreateSpreadsheet = (): React.ReactElement => {
  React.useEffect(() => {
    createSpreadsheet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createSpreadsheet() {
    const baseUrl = `https://docs.google.com/spreadsheet/create`;
    await open(baseUrl);
  }
  return <div />;
};
