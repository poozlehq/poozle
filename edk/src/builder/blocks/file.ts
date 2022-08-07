import { BlockBuilderBase } from '../internal/base';
import { BlockType, FileType } from '../internal/constants';
import { BlockDto } from '../internal/dto';
import { applyMixins } from '../internal/helpers';
import { BlockId, End } from '../internal/methods';

export interface FileParams {
  blockId?: string;
  externalId?: string;
}

export interface FileBuilder extends BlockId, End {}

export class FileBuilder extends BlockBuilderBase {
  /** @internal */

  public build(): Readonly<BlockDto> {
    return this.getResult(BlockDto, {
      type: BlockType.File,
      source: FileType.Remote,
    });
  }
}

applyMixins(FileBuilder, [BlockId, End]);
