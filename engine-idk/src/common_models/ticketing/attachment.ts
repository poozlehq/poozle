/** Copyright (c) 2023, Poozle, all rights reserved. **/

export interface UploadedBy {
  id: string;
  username: string;
}

export interface Attachment {
  id: string;
  ticket_id: string;
  file_name: string;
  file_url: string;
  content_type: string;
  uploaded_by: UploadedBy;
  created_at: string;
  updated_at: string;
}
