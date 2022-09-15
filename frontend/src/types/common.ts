import { Builder } from '@poozle/edk';

const { BlockType, SurfaceType, ElementType } = Builder;

export interface Element {
  fetch_data_id: string | undefined;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  action_id: string;
  placeholder: string;
}

export interface Block {
  type: string;
  label: string;
  element: Element;
  blocks?: Block[];
}

export interface Surface {
  type: string;
  blocks: Block[];
  callback_id: string;
  fetch_data_id?: string;
}

export interface SearchResult {
  text: string;
  icon: string;
  description: string;
}

export { BlockType, SurfaceType, ElementType };
