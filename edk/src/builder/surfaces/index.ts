import { FormBuilder, FormParams } from './form';

export function Form(params?: FormParams): FormBuilder {
  return new FormBuilder(params);
}

export type Surface = FormBuilder;
