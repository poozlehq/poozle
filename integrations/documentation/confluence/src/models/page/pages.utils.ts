/* eslint-disable @typescript-eslint/no-explicit-any */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { PageWithRaw } from './page.interface';

export function convertPage(pageData: any): PageWithRaw {
  return {
    id: pageData.id,
    parent_id: pageData.parentId,
    title: pageData.title,
    created_by: pageData.authorId,
    created_at: pageData.createdAt,
    updated_at: '',
    updated_by: '',
    raw: pageData,
  };
}
