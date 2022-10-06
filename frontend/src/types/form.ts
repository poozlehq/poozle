import { InputBlockType, SelectItem } from '../../../edk/src';

export interface FormBlock {
  name: string;
  description: string;
  key: string;
  type: InputBlockType;

  data?: SelectItem;
}
