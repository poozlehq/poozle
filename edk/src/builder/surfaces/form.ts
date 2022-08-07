import { SurfaceBuilderBase } from '../internal/base';
import { FormDto } from '../internal/dto';
import { applyMixins, getBuilderResults } from '../internal/helpers';
import {
  Blocks,
  Text,
  BuildToJSON,
  BuildToObject,
  GetBlocks,
  CallbackId,
} from '../internal/methods';

import type { BlockDto } from '../internal/dto';
import type { BlockBuilder } from '../internal/types';
import { SurfaceType } from '../internal/constants';

export interface FormParams {
  type?: string;
  text?: string;
  callbackId?: string;
}

export interface FormBuilder
  extends Blocks<BlockBuilder>,
    Text,
    CallbackId,
    BuildToJSON,
    BuildToObject<FormDto>,
    GetBlocks {}

export class FormBuilder extends SurfaceBuilderBase {
  public build(): Readonly<FormDto> {
    return this.getResult(FormDto, {
      type: SurfaceType.Form,
      blocks: getBuilderResults<BlockDto>(this.props.blocks),
    });
  }
}

applyMixins(FormBuilder, [
  Blocks,
  Text,
  BuildToJSON,
  BuildToObject,
  GetBlocks,
  CallbackId,
]);
