import type {
  CheckboxesBuilder,
  DatePickerBuilder,
  ImgBuilder,
  RadioButtonsBuilder,
  TextInputBuilder,
  TextEditorBuilder,
  TimePickerBuilder,
} from '../../elements';
import type {
  DividerBuilder,
  HeaderBuilder,
  ImageBuilder,
  InputBuilder,
  SectionBuilder,
} from '../../blocks';

export type ActionsElementBuilder =
  | CheckboxesBuilder
  | DatePickerBuilder
  | RadioButtonsBuilder
  | TimePickerBuilder;

export type SectionElementBuilder =
  | CheckboxesBuilder
  | DatePickerBuilder
  | ImgBuilder
  | RadioButtonsBuilder
  | TimePickerBuilder;

export type InputElementBuilder =
  | CheckboxesBuilder
  | DatePickerBuilder
  | RadioButtonsBuilder
  | TextInputBuilder
  | TextEditorBuilder
  | TimePickerBuilder;

export type ContextElement = ImgBuilder | string;

export type BlockBuilder =
  | DividerBuilder
  | HeaderBuilder
  | ImageBuilder
  | InputBuilder
  | SectionBuilder
  | ViewBlockBuilder;

export type ViewBlockBuilder =
  | DividerBuilder
  | HeaderBuilder
  | ImageBuilder
  | InputBuilder
  | SectionBuilder;

export type FilterString = 'im' | 'mpim' | 'private' | 'public';

// Internal use only

export interface ObjectLiteral {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Ctor<T = Record<string, unknown>> = new (...args: any[]) => T;

export type AbstractCtor<T> = { prototype: T };

export type Undefinable<T> = T | undefined;

export type Nullable<T> = T | null;

export type Settable<T> = Undefinable<T>;

export type UndefinableArray<T> = Undefinable<T>[];

export type Appendable<T> = UndefinableArray<T | UndefinableArray<T>>;

export type Fn<T, R> = (arg: T) => R;

export type BlockBuilderReturnableFn<T> = Fn<T, Appendable<BlockBuilder>>;

export type StringReturnableFn<T> = Fn<T, string>;

export enum QuickActionTypeEnum {
  COPY = 'copy',
  OPEN = 'open',
}

export type QuickActionValueType = Map<any, any> | string
