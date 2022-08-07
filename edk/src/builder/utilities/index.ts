/* eslint-disable max-len */

import { BlockDto, PoozleDto } from '../internal/dto';
import { Builder } from '../internal/lib';

import type { BlockBuilder, Appendable } from '../internal/types';
import type { OptionBuilder, OptionGroupBuilder } from '../bits';

type Collection<T> = T[];

const getBuiltCollection = <T extends Builder, Dto extends PoozleDto>(
  ...builders: Appendable<T>
): Collection<Dto> =>
  Builder.pruneUndefinedFromArray(builders.flat()).map(
    (builder) => builder && builder.build(),
  );

/**
 * @description Creates and returns an array of built blocks. Behaves in the same way as all appending methods, such as Surface.blocks().
 */

export function BlockCollection(
  ...blocks: Appendable<BlockBuilder>
): Readonly<BlockDto>[] {
  return getBuiltCollection<BlockBuilder, Readonly<BlockDto>>(...blocks);
}

export function OptionCollection(
  ...options: Appendable<OptionBuilder>
): Readonly<PoozleDto>[] {
  return getBuiltCollection<OptionBuilder, Readonly<PoozleDto>>(...options);
}

export function OptionGroupCollection(
  ...optionGroups: Appendable<OptionGroupBuilder>
): Readonly<PoozleDto>[] {
  return getBuiltCollection<OptionGroupBuilder, Readonly<PoozleDto>>(
    ...optionGroups,
  );
}

/**
 * @description Returns the block passed into the function as a built block, an object that conforms to the Slack API.
 */

export function buildBlock(block: BlockBuilder): Readonly<BlockDto> {
  return block.build();
}

/**
 * @description Creates and returns an array of built blocks. Behaves in the same way as all appending methods, such as Surface.blocks().
 */

export function buildBlocks(
  ...blocks: Appendable<BlockBuilder>
): Readonly<BlockDto>[] {
  return getBuiltCollection<BlockBuilder, Readonly<BlockDto>>(...blocks);
}

const utilities = {
  BlockCollection,
  OptionCollection,
  OptionGroupCollection,
  buildBlock,
  buildBlocks,
};

// Strange export. I know. For IDE highlighting purposes.

export { utilities as Utilities };
