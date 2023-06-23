/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { QueryParams } from 'common/interfaces/query.interface';
import { Meta } from 'common/interfaces/response.interface';

export class CollectionQueryParams extends QueryParams {}

export class Collection {
  id: string;
  parent_id: string;
  type: string;
  name: string;
  description: string;
  updated_at: string;
  created_at: string;
}

export class TicketingCollectionsResponse {
  data: Collection[];
  meta: Meta;
}
