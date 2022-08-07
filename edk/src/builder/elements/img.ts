import { ElementBuilderBase } from '../internal/base';
import { ElementType } from '../internal/constants';
import { ElementDto } from '../internal/dto';
import { applyMixins } from '../internal/helpers';
import { AltText, ImageUrl, End } from '../internal/methods';

export interface ImgParams {
  imageUrl?: string;
  altText?: string;
}

export interface ImgBuilder extends AltText, ImageUrl, End {}

export class ImgBuilder extends ElementBuilderBase {
  /** @internal */

  public build(): Readonly<ElementDto> {
    return this.getResult(ElementDto, {
      type: ElementType.Image,
    });
  }
}

applyMixins(ImgBuilder, [AltText, ImageUrl, End]);
