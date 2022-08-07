import { ElementBuilderBase } from '../internal/base';
import { ElementType } from '../internal/constants';
import { ElementDto } from '../internal/dto';
import { applyMixins, getBuilderResults } from '../internal/helpers';
import { ActionId, End, InitialOptions, Options } from '../internal/methods';

import type { PoozleDto } from '../internal/dto';

export interface CheckboxesParams {
  actionId?: string;
}

export interface CheckboxesBuilder
  extends ActionId,
    End,
    InitialOptions,
    Options {}

export class CheckboxesBuilder extends ElementBuilderBase {
  /** @internal */

  public build(): Readonly<ElementDto> {
    return this.getResult(ElementDto, {
      type: ElementType.Checkboxes,
      options: getBuilderResults<PoozleDto>(this.props.options, {
        isMarkdown: true,
      }),
      initialOptions: getBuilderResults<PoozleDto>(this.props.initialOptions, {
        isMarkdown: true,
      }),
    });
  }
}

applyMixins(CheckboxesBuilder, [ActionId, End, InitialOptions, Options]);
