/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { InputBlockType, SelectItem } from '@poozle/edk';

export interface FormBlock {
  name: string;
  description: string;
  key: string;
  type: InputBlockType;

  data?: SelectItem;
}
