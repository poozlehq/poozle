import { ElementBuilderBase } from '../internal/base';
import { ElementType } from '../internal/constants';
import { ElementDto } from '../internal/dto';
import { applyMixins, getFormattedDate } from '../internal/helpers';
import { ActionId, End, InitialDate, Placeholder } from '../internal/methods';

export interface DatePickerParams {
  actionId?: string;
  initialDate?: Date;
  placeholder?: string;
}

export interface DatePickerBuilder
  extends ActionId,
    End,
    InitialDate,
    Placeholder {}

export class DatePickerBuilder extends ElementBuilderBase {
  /** @internal */

  public build(): Readonly<ElementDto> {
    return this.getResult(ElementDto, {
      type: ElementType.DatePicker,
      placeholder: this.props.placeholder,
      initialDate: getFormattedDate(this.props.initialDate),
    });
  }
}

applyMixins(DatePickerBuilder, [ActionId, End, InitialDate, Placeholder]);
