/* eslint-disable max-len */

import { OptionBuilder, OptionParams } from './option';
import { OptionGroupBuilder, OptionGroupParams } from './option-group';

export type {
  OptionBuilder,
  OptionParams,
  OptionGroupBuilder,
  OptionGroupParams,
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

export function OptionGroup(params?: OptionGroupParams): OptionGroupBuilder {
  return new OptionGroupBuilder(params);
}

const bits = {
  Option,
  OptionGroup,
};

// Strange export. I know. For IDE highlighting purposes.

export { bits as Bits };
