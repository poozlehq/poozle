import { ElementBuilderBase } from '../internal/base';
import { ElementType } from '../internal/constants';
import { ElementDto } from '../internal/dto';
import { applyMixins } from '../internal/helpers';
import { ActionId, End, InitialTime, Placeholder } from '../internal/methods';

export interface TimePickerParams {
  actionId?: string;
  initialTime?: string;
  placeholder?: string;
}

export interface TimePickerBuilder
  extends ActionId,
    End,
    InitialTime,
    Placeholder {}

export class TimePickerBuilder extends ElementBuilderBase {
  /** @internal */

  public build(): Readonly<ElementDto> {
    return this.getResult(ElementDto, {
      type: ElementType.TimePicker,
      placeholder: this.props.placeholder,
    });
  }
}

applyMixins(TimePickerBuilder, [ActionId, End, InitialTime, Placeholder]);
