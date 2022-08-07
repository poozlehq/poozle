import { ElementBuilderBase } from '../internal/base';
import { ElementType } from '../internal/constants';
import { ElementDto } from '../internal/dto';
import { applyMixins } from '../internal/helpers';
import {
  ActionId,
  End,
  InitialValue,
  MaxLength,
  MinLength,
  Multiline,
  Placeholder,
} from '../internal/methods';

export interface TextInputParams {
  actionId?: string;
  initialValue?: string;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
}

export interface TextInputBuilder
  extends ActionId,
    End,
    InitialValue,
    MaxLength,
    MinLength,
    Multiline,
    Placeholder {}

export class TextInputBuilder extends ElementBuilderBase {
  /** @internal */

  public build(): Readonly<ElementDto> {
    return this.getResult(ElementDto, {
      type: ElementType.TextInput,
      placeholder: this.props.placeholder,
    });
  }
}

applyMixins(TextInputBuilder, [
  ActionId,
  End,
  InitialValue,
  MaxLength,
  MinLength,
  Multiline,
  Placeholder,
]);
