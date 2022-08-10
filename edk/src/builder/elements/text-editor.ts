import { ElementBuilderBase } from '../internal/base';
import { ElementType } from '../internal/constants';
import { ElementDto } from '../internal/dto';
import { applyMixins } from '../internal/helpers';
import { ActionId, End, InitialValue } from '../internal/methods';

export interface TextEditorParams {
  actionId?: string;
  initialValue?: string;
}

export interface TextEditorBuilder extends ActionId, End, InitialValue {}

export class TextEditorBuilder extends ElementBuilderBase {
  /** @internal */

  public build(): Readonly<ElementDto> {
    return this.getResult(ElementDto, {
      type: ElementType.TextEditor,
    });
  }
}

applyMixins(TextEditorBuilder, [ActionId, End, InitialValue]);
