import { BitBuilderBase } from '../internal/base';
import { PoozleDto } from '../internal/dto';
import { applyMixins } from '../internal/helpers';
import { Description, Icon, Text, Url, Value } from '../internal/methods';

export interface OptionParams {
  description?: string;
  text?: string;
  url?: string;
  value?: string;
  icon?: string;
}

export interface OptionBuilder extends Description, Text, Url, Value, Icon {}

export class OptionBuilder extends BitBuilderBase {
  /** @internal */

  public build(): Readonly<PoozleDto> {
    return this.getResult(PoozleDto, {
      text: this.props.text,
      description: this.props.description,
    });
  }
}

applyMixins(OptionBuilder, [Description, Text, Url, Value, Icon]);
