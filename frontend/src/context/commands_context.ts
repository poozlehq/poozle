/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Command } from '@poozle/edk';
import { createContext } from 'react';

export const CommandsContext = createContext<Command[]>([]);
