export const CollectionSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      default: '',
    },
    parent_id: {
      type: 'string',
      default: '',
    },
    type: {
      type: 'string',
      default: '',
    },
    name: {
      type: 'string',
      default: '',
    },
    description: {
      type: 'string',
      default: '',
    },
    updated_at: {
      type: 'string',
      default: '',
    },
    created_at: {
      type: 'string',
      default: '',
    },
  },
  required: ['id', 'parent_id', 'type', 'name', 'description', 'updated_at', 'created_at'],
};
