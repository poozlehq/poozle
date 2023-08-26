/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Tag } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface TagWithRaw extends Tag {
  raw: any;
}
export interface TagsResponse {
  data: TagWithRaw[];
  meta: Meta;
}

export interface TagResponse {
  data: TagWithRaw;
}

export interface IssueLabelCreateParams extends Tag {
  team_id: string;
  parent_id: string;
}

export interface TagCreateResponse {
  lastSyncId: number;
  success: string;
  tag: TagWithRaw;
}

export interface GetTagParams {
  pathParams: {
    tag_id: number;
  };
}

export interface IssueLabelUpdateParams {
  pathParams: {
    tag_id: number;
  };
  input: IssueLabelCreateParams;
}
