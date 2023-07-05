/** Copyright (c) 2023, Poozle, all rights reserved. **/

export const AttachmentSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      default: '',
    },
    file_name: {
      type: 'string',
      default: '',
    },
    ticket_id: {
      type: 'string',
      default: '',
    },
    file_url: {
      type: 'string',
      default: '',
    },
    content_type: {
      type: 'string',
      default: '',
    },
    uploaded_by: {
      type: 'string',
      default: '',
    },
    created_at: {
      type: 'string',
      default: '',
    },
    updated_at: {
      type: 'string',
      default: '',
    },
  },
};

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
