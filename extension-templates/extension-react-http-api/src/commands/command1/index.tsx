/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { ExtensionSpecDataType } from '@poozle/edk';
import * as React from 'react';

interface CommandProps {
  specData: ExtensionSpecDataType;
  resetCommand: () => void;
}

export const Command1 = (props: CommandProps): React.ReactElement => {
  return (
    <div>
      <h2> Command View</h2>
    </div>
  );
};
