import { BlockBuilderBase } from '../internal/base';
import { BlockType } from '../internal/constants';
import { BlockDto } from '../internal/dto';
import { applyMixins } from '../internal/helpers';
import { BlockId, End } from '../internal/methods';

export interface DividerParams {
  blockId?: string;
}

export interface DividerBuilder extends BlockId, End {}

export class DividerBuilder extends BlockBuilderBase {
  /** @internal */

  public build(): Readonly<BlockDto> {
    return this.getResult(BlockDto, {
      type: BlockType.Divider,
    });
  }
}

applyMixins(DividerBuilder, [BlockId]);
