/** Copyright (c) 2022, Poozle, all rights reserved. **/

import React from 'react';
import { useLocation } from 'react-router-dom';

import { getCommandInfoFromLocation } from './command_helper';

export const useCommandInformation = () => {
  const location = useLocation();
  const { extensionId, commandKey } = getCommandInfoFromLocation(location);

  return React.useMemo(() => ({ extensionId, commandKey }), [commandKey, extensionId]);
};
