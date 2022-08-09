import { ElementBuilderBase } from '../internal/base';
import { ElementType } from '../internal/constants';
import { ElementDto } from '../internal/dto';
import {
  applyMixins,
  getBuilderResult,
  getBuilderResults,
} from '../internal/helpers';
import {
  ActionId,
  End,
  FetchDataId,
  InitialOption,
  Label,
  Options,
  Placeholder,
} from '../internal/methods';

import type { PoozleDto } from '../internal/dto';

export interface SelectParams {
  label?: string;
  actionId?: string;
  fetchDataId?: string;
}

export interface SelectBuilder
  extends ActionId,
    End,
    InitialOption,
    Options,
    Placeholder,
    Label,
    FetchDataId {}

export class SelectBuilder extends ElementBuilderBase {
  /** @internal */

  public build(): Readonly<ElementDto> {
    return this.getResult(ElementDto, {
      type: ElementType.Select,
      label: this.props.label,
      fetchDataId: this.props.fetchDataId,
      options: getBuilderResults<PoozleDto>(this.props.options),
      initialOption: getBuilderResult<PoozleDto>(this.props.initialOption),
    });
  }
}

applyMixins(SelectBuilder, [
  ActionId,
  End,
  InitialOption,
  Options,
  Placeholder,
  FetchDataId,
  Label,
]);
