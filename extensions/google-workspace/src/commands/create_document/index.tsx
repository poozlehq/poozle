/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { open } from '@tauri-apps/api/shell';
import * as React from 'react';

export const CreateDocument = (): React.ReactElement => {
  React.useEffect(() => {
    createDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createDocument() {
    const baseUrl = `https://docs.google.com/document/create`;
    await open(baseUrl);
  }
  return <div />;
};
