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
      default: false
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
