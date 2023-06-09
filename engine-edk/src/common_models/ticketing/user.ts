export const UserSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      default: '',
    },
    name: {
      type: 'string',
      default: '',
    },
    email_address: {
      type: 'string',
      default: '',
    },
    avatar: {
      type: 'string',
      default: '',
    },
  },
};
