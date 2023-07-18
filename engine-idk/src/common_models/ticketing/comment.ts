/** Copyright (c) 2023, Poozle, all rights reserved. **/

export interface Creator {
  id: string;
  username: string;
}
export interface Comment {
  id: string;
  ticket_id: string;
  body: string;
  html_body: string;
  created_by_id: string;
  created_by: Creator;
  is_private: boolean;
  created_at: string;
  updated_at: string;
}

export interface UpdateCommentBody {
  body: string;
}

export interface CreateCommentBody {
  body: string;
}
