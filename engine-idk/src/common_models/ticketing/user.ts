/** Copyright (c) 2023, Poozle, all rights reserved. **/

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

export interface User {
  id: string;
  name: string;
  email_address: string;
  avatar: string;
}
