import { SurfaceBuilderBase } from '../internal/base';
import { QuickActionDto } from '../internal/dto';
import { applyMixins } from '../internal/helpers';
import {
  Title,
  QuickActionType,
  BuildToJSON,
  BuildToObject,
  QuickActionValue,
} from '../internal/methods';

import { SurfaceType } from '../internal/constants';
import { QuickActionTypeEnum, QuickActionValueType } from '../internal/types';

export interface QuickActionParams {
  quickActionType?: QuickActionTypeEnum;
  value?: QuickActionValueType;
  title?: string;
}

export interface QuickActionBuilder
  extends Title,
    QuickActionType,
    QuickActionValue,
    BuildToJSON,
    BuildToObject<QuickActionDto> {}

export class QuickActionBuilder extends SurfaceBuilderBase {
  public build(): Readonly<QuickActionDto> {
    return this.getResult(QuickActionDto, {
      type: SurfaceType.QuickAction,
    });
  }
}

applyMixins(QuickActionBuilder, [
  Title,
  QuickActionType,
  QuickActionValue,
  BuildToJSON,
  BuildToObject,
]);
