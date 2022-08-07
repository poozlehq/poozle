import { BlockBuilderBase } from '../internal/base';
import { BlockType } from '../internal/constants';
import { BlockDto } from '../internal/dto';
import { applyMixins } from '../internal/helpers';
import {
  AltText,
  BlockId,
  Description,
  End,
  Title,
  TitleUrl,
  VideoUrl,
} from '../internal/methods';

export interface VideoParams {
  blockId?: string;
  description?: string;
  providerIconUrl?: string;
  providerName?: string;
  thumbnailUrl?: string;
  title?: string;
  titleUrl?: string;
  videoUrl?: string;
}

export interface VideoBuilder
  extends AltText,
    BlockId,
    Description,
    End,
    Title,
    TitleUrl,
    VideoUrl {}

export class VideoBuilder extends BlockBuilderBase {
  /** @internal */

  build(): Readonly<BlockDto> {
    return this.getResult(BlockDto, {
      type: BlockType.Video,
      description: this.props.description,
      title: this.props.title,
    });
  }
}

applyMixins(VideoBuilder, [
  AltText,
  BlockId,
  Description,
  End,
  Title,
  TitleUrl,
  VideoUrl,
]);
