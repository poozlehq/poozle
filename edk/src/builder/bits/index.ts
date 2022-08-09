/* eslint-disable max-len */

import { OptionBuilder, OptionParams } from './option';
import { OptionGroupBuilder, OptionGroupParams } from './option-group';
import { SearchResultBuilder, SearchResultParam } from './search-result';

export type {
  OptionBuilder,
  OptionParams,
  OptionGroupBuilder,
  OptionGroupParams,
  SearchResultParam,
  SearchResultBuilder,
};

export function Option(params?: OptionParams): OptionBuilder {
  return new OptionBuilder(params);
}

/**
 * @param {Object} [params] Parameters passed to the constructor.
 * @param {string} [params.label] Sets the label shown above the group of option.
 *
 * {@link https://api.slack.com/reference/block-kit/composition-objects#option_group|View in Slack API Documentation}
 */

export function OptionGroup(params?: OptionGroupBuilder): OptionGroupBuilder {
  return new OptionGroupBuilder(params);
}

export function SearchResult(params?: SearchResultParam): SearchResultBuilder {
  return new SearchResultBuilder(params);
}

const bits = {
  Option,
  OptionGroup,
  SearchResult,
};

// Strange export. I know. For IDE highlighting purposes.

export { bits as Bits };
