import { ElementBuilderBase } from '../internal/base';
import { ElementType } from '../internal/constants';
import { ElementDto } from '../internal/dto';
import {
  applyMixins,
  getBuilderResult,
  getBuilderResults,
} from '../internal/helpers';
import { ActionId, End, InitialOption, Options } from '../internal/methods';

import type { PoozleDto } from '../internal/dto';

export interface RadioButtonsParams {
  actionId?: string;
}

export interface RadioButtonsBuilder
  extends ActionId,
    End,
    InitialOption,
    Options {}

export class RadioButtonsBuilder extends ElementBuilderBase {
  /** @internal */

  public build(): Readonly<ElementDto> {
    return this.getResult(ElementDto, {
      type: ElementType.RadioButtons,
      options: getBuilderResults<PoozleDto>(this.props.options, {
        isMarkdown: true,
      }),
      initialOption: getBuilderResult<PoozleDto>(this.props.initialOption, {
        isMarkdown: true,
      }),
    });
  }
}

applyMixins(RadioButtonsBuilder, [ActionId, End, InitialOption, Options]);
