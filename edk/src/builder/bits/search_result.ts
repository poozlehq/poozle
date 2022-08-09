import { BitBuilderBase } from '../internal/base';
import { PoozleDto } from '../internal/dto';
import { applyMixins } from '../internal/helpers';
import { Description, Icon, Text } from '../internal/methods';

export interface SearchResultParam {
  description?: string;
  text?: string;
  icon?: string;
}

export interface SearchResultBuilder extends Description, Text, Icon {}

export class SearchResultBuilder extends BitBuilderBase {
  /** @internal */

  public build(): Readonly<PoozleDto> {
    return this.getResult(PoozleDto, {
      text: this.props.text,
      description: this.props.description,
    });
  }
}

applyMixins(SearchResultBuilder, [Description, Text, Icon]);
