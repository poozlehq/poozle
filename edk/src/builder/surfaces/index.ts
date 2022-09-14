import { FormBuilder, FormParams } from './form';
import { QuickActionBuilder, QuickActionParams } from './quickActions';
import { SearchBuilder, SearchParams } from './search';

export function Form(params?: FormParams): FormBuilder {
  return new FormBuilder(params);
}

export function Search(params?: SearchParams): SearchBuilder {
  return new SearchBuilder(params);
}

export function QuickAction(params?: QuickActionParams): QuickActionBuilder {
  return new QuickActionBuilder(params);
}

export type Surface = FormBuilder | SearchBuilder | QuickActionBuilder;
