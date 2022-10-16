import { InputBlockType, SelectItem } from './extension';

interface FormBlock {
  name: string;
  description: string;
  key: string;
  type: InputBlockType;
  data?: SelectItem;
}

export type { FormBlock };
