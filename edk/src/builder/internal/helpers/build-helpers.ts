import { Builder } from '../lib';

import type { ObjectLiteral, Undefinable } from '../types';

const defaultParams = {
  isMarkdown: false,
};

const valueOrUndefined = <T>(value: T): Undefinable<T> =>
  value === undefined ? undefined : value;

export function getBuilderResult<T>(
  builder: Builder,
  params: ObjectLiteral = defaultParams,
): T {
  return valueOrUndefined(builder) && builder.build(params);
}

export function getBuilderResults<T>(
  builders: Builder[],
  params: ObjectLiteral = defaultParams,
): Undefinable<T[]> {
  return (
    valueOrUndefined(builders) &&
    builders.map((builder) => getBuilderResult<T>(builder, params))
  );
}

export function getFormattedDate(date: Date): Undefinable<string> {
  return valueOrUndefined(date) && date.toISOString().split('T')[0];
}
