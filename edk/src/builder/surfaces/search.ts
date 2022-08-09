import { SurfaceBuilderBase } from '../internal/base';
import { FormDto } from '../internal/dto';
import { applyMixins, getBuilderResults } from '../internal/helpers';
import {
  Blocks,
  BuildToJSON,
  BuildToObject,
  GetBlocks,
  CallbackId,
  Placeholder,
} from '../internal/methods';

import type { BlockDto } from '../internal/dto';
import type { BlockBuilder } from '../internal/types';
import { SurfaceType } from '../internal/constants';

export interface SearchParams {
  placeholder?: string;
  callbackId?: string;
}

export interface SearchBuilder
  extends Blocks<BlockBuilder>,
    CallbackId,
    BuildToJSON,
    BuildToObject<FormDto>,
    Placeholder,
    GetBlocks {}

export class SearchBuilder extends SurfaceBuilderBase {
  public build(): Readonly<FormDto> {
    return this.getResult(FormDto, {
      type: SurfaceType.Form,
      filters: getBuilderResults<BlockDto>(this.props.blocks),
    });
  }
}

applyMixins(SearchBuilder, [
  Blocks,
  BuildToJSON,
  BuildToObject,
  GetBlocks,
  CallbackId,
  Placeholder,
]);
