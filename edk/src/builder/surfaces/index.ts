import { FormBuilder, FormParams } from './form';
import { SearchBuilder, SearchParams } from './search';

export function Form(params?: FormParams): FormBuilder {
  return new FormBuilder(params);
}

export function Search(params?: SearchParams): SearchBuilder {
  return new SearchBuilder(params);
}

export type Surface = FormBuilder | SearchBuilder;
