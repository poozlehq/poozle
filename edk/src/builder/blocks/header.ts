import { BlockBuilderBase } from '../internal/base';
import { BlockType } from '../internal/constants';
import { BlockDto } from '../internal/dto';
import { applyMixins } from '../internal/helpers';
import { BlockId, End, Text } from '../internal/methods';

export interface HeaderParams {
  blockId?: string;
  text?: string;
}

export interface HeaderBuilder extends BlockId, End, Text {}

export class HeaderBuilder extends BlockBuilderBase {
  /** @internal */

  public build(): Readonly<BlockDto> {
    return this.getResult(BlockDto, {
      type: BlockType.Header,
      text: this.props.text,
    });
  }
}

applyMixins(HeaderBuilder, [BlockId, End, Text]);
