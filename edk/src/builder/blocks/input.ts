import { BlockBuilderBase } from '../internal/base';
import { BlockType } from '../internal/constants';
import { BlockDto } from '../internal/dto';
import { applyMixins, getBuilderResult } from '../internal/helpers';
import {
  BlockId,
  Element,
  End,
  Hint,
  Label,
  Optional,
} from '../internal/methods';

import type { ElementDto } from '../internal/dto';
import type { InputElementBuilder } from '../internal/types';

export interface InputParams {
  blockId?: string;
  hint?: string;
  label?: string;
}

export interface InputBuilder
  extends BlockId,
    Element<InputElementBuilder>,
    End,
    Hint,
    Label,
    Optional {}

export class InputBuilder extends BlockBuilderBase {
  /** @internal */

  public build(): Readonly<BlockDto> {
    return this.getResult(BlockDto, {
      type: BlockType.Input,
      label: this.props.label,
      hint: this.props.hint,
      element: getBuilderResult<ElementDto>(this.props.element),
    });
  }
}

applyMixins(InputBuilder, [BlockId, Element, End, Hint, Label, Optional]);
