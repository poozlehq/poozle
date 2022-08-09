import { Builder } from '@poozle/edk';

const { BlockType, SurfaceType, ElementType } = Builder;

export type Element = {
  fetch_data_id: string | undefined;
  type: string;
  data: any[];
  action_id: string;
  placeholder: string;
};

export type Block = {
  type: string;
  label: string;
  element: Element;
  blocks?: Block[];
};
export { BlockType, SurfaceType, ElementType };
