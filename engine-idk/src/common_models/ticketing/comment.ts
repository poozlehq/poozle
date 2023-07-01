export const CommentSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      default: '',
    },
    ticket_id: {
      type: 'string',
      default: '',
    },
    body: {
      type: 'string',
      default: '',
    },
    html_body: {
      type: 'string',
      default: '',
    },
    created_by_id: {
      type: 'string',
      default: '',
    },
    created_by: {
      type: 'string',
      default: '',
    },
    is_private: {
      type: 'string',
      default: false,
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
  is_private: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateCommentBody {
  body: string;
}

export interface CreateCommentBody {
  body: string;
}
