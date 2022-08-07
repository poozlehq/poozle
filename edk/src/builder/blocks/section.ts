import { BlockBuilder } from '../internal';
import { BlockBuilderBase } from '../internal/base';
import { BlockType } from '../internal/constants';
import { BlockDto } from '../internal/dto';
import { applyMixins, getBuilderResults } from '../internal/helpers';
import {
  BlockId,
  Blocks,
  ConditionalCheck,
  End,
  GetBlocks,
  Text,
} from '../internal/methods';

export interface SectionParams {
  blockId?: string;
  text?: string;
  conditionalCheck?: string;
}

export interface SectionBuilder
  extends Blocks<BlockBuilder>,
    BlockId,
    End,
    Text,
    GetBlocks,
    ConditionalCheck {}

export class SectionBuilder extends BlockBuilderBase {
  /** @internal */

  public build(): Readonly<BlockDto> {
    return this.getResult(BlockDto, {
      type: BlockType.Section,
      text: this.props.text,
      conditionalCheck: this.props.conditionalCheck,
      blocks: getBuilderResults<BlockDto>(this.props.blocks),
    });
  }
}

applyMixins(SectionBuilder, [
  Blocks,
  BlockId,
  End,
  Text,
  GetBlocks,
  ConditionalCheck,
]);
