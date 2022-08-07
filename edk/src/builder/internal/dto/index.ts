/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { BlockType, ElementType } from '../constants';

import type { ObjectLiteral } from '../types';

export enum Param {
  actionId = 'action_id',
  fetchDataId = 'fetch_data_id',
  blocks = 'blocks',
  blockId = 'block_id',
  conditionalCheck = 'conditional_check',
  maxSelectedItems = 'max_selected_items',
  title = 'title',
  text = 'text',
  icon = 'icon',
  confirm = 'confirm',
  deny = 'deny',
  style = 'style',
  danger = 'danger',
  label = 'label',
  options = 'options',
  value = 'value',
  description = 'description',
  url = 'url',
  elements = 'elements',
  imageUrl = 'image_url',
  altText = 'alt_text',
  element = 'element',
  hint = 'hint',
  optional = 'optional',
  initialOptions = 'initial_options',
  filter = 'filter',
  initialDate = 'initial_date',
  minQueryLength = 'min_query_length',
  initialOption = 'initial_option',
  placeholder = 'placeholder',
  initialValue = 'initial_value',
  multiline = 'multiline',
  minLength = 'min_length',
  maxLength = 'max_length',
  callbackId = 'callback_id',
  initialTime = 'initial_time',
  mrkdwn = 'mrkdwn',
  type = 'type',
  titleUrl = 'title_url',
  thumbnailUrl = 'thumbnail_url',
  videoUrl = 'video_url',
}

export class PoozleDto implements ObjectLiteral {
  constructor(params: ObjectLiteral) {
    Object.keys(params).forEach((paramName) => {
      const mappedParam = PoozleDto.mapParam(paramName);

      if (params[paramName] !== undefined && mappedParam !== undefined) {
        // @ts-ignore -- Dynamically created class
        this[mappedParam] = params[paramName];
      }
    });
  }

  public static mapParam(param: string): string {
    // @ts-ignore -- Dynamically created class
    return Param[param];
  }
}

export class FormDto extends PoozleDto {
  public readonly blocks?: BlockDto[];
}

export class BlockDto extends PoozleDto {
  // @ts-ignore -- Dynamically created class
  public readonly type: BlockType;
}

export class ElementDto extends PoozleDto {
  // @ts-ignore -- Dynamically created class
  public readonly type: ElementType;
}
