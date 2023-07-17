/** Copyright (c) 2023, Poozle, all rights reserved. **/

export interface Page {
  id: string;
  parent_id: string;
  title: string;
  type?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  updated_by: string;
}

export interface CreatePage {
  parent_id: string;
  title: string;
}
