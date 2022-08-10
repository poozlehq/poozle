/* eslint-disable max-len */

import { CheckboxesBuilder, CheckboxesParams } from './checkboxes';
import { DatePickerBuilder, DatePickerParams } from './datepicker';
import { ImgBuilder, ImgParams } from './img';
import { RadioButtonsBuilder, RadioButtonsParams } from './radio-buttons';
import { TextInputBuilder, TextInputParams } from './text-input';
import { TimePickerBuilder, TimePickerParams } from './timepicker';
import { SelectBuilder, SelectParams } from './select';
import { TextEditorBuilder, TextEditorParams } from './text-editor';

export type {
  CheckboxesBuilder,
  CheckboxesParams,
  DatePickerBuilder,
  DatePickerParams,
  ImgBuilder,
  ImgParams,
  RadioButtonsBuilder,
  RadioButtonsParams,
  TextInputBuilder,
  TextInputParams,
  TextEditorBuilder,
  TextEditorParams,
  TimePickerBuilder,
  TimePickerParams,
  SelectBuilder,
  SelectParams,
};

export function Checkboxes(params?: CheckboxesParams): CheckboxesBuilder {
  return new CheckboxesBuilder(params);
}

export function DatePicker(params?: DatePickerParams): DatePickerBuilder {
  return new DatePickerBuilder(params);
}

export function Img(params?: ImgParams): ImgBuilder {
  return new ImgBuilder(params);
}

export function RadioButtons(params?: RadioButtonsParams): RadioButtonsBuilder {
  return new RadioButtonsBuilder(params);
}

export function TextInput(params?: TextInputParams): TextInputBuilder {
  return new TextInputBuilder(params);
}

export function TextEditor(params?: TextEditorParams): TextEditorBuilder {
  return new TextEditorBuilder(params);
}

export function TimePicker(params?: TimePickerParams): TimePickerBuilder {
  return new TimePickerBuilder(params);
}

export function Select(params?: SelectParams): SelectBuilder {
  return new SelectBuilder(params);
}

const elements = {
  Checkboxes,
  DatePicker,
  Img,
  RadioButtons,
  TextInput,
  TimePicker,
  Select,
};

// Strange export. I know. For IDE highlighting purposes.

export { elements as Elements };
