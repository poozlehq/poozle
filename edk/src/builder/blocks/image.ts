import { BlockBuilderBase } from '../internal/base';
import { BlockType } from '../internal/constants';
import { BlockDto } from '../internal/dto';
import { applyMixins } from '../internal/helpers';
import { AltText, BlockId, End, ImageUrl, Title } from '../internal/methods';

export interface ImageParams {
  altText?: string;
  blockId?: string;
  imageUrl?: string;
  title?: string;
}

export interface ImageBuilder extends AltText, BlockId, End, ImageUrl, Title {}

export class ImageBuilder extends BlockBuilderBase {
  /** @internal */

  public build(): Readonly<BlockDto> {
    return this.getResult(BlockDto, {
      type: BlockType.Image,
      title: this.props.title,
    });
  }
}

applyMixins(ImageBuilder, [AltText, BlockId, End, ImageUrl, Title]);
