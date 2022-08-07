import { BitBuilderBase } from '../internal/base';
import { PoozleDto } from '../internal/dto';
import { applyMixins, getBuilderResults } from '../internal/helpers';
import { Label, Options } from '../internal/methods';

export interface OptionGroupParams {
  label?: string;
}

export interface OptionGroupBuilder extends Label, Options {}

export class OptionGroupBuilder extends BitBuilderBase {
  /** @internal */

  public build(): Readonly<PoozleDto> {
    return this.getResult(PoozleDto, {
      label: this.props.label,
      options: getBuilderResults<PoozleDto>(this.props.options),
    });
  }
}

applyMixins(OptionGroupBuilder, [Label, Options]);
