export const TagSchema = {
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
    description: {
      type: 'string',
      default: '',
    },
    color: {
      type: 'string',
      default: '',
    }
  },
};


export interface Tag {
  id: string,
  name: string,
  description: string,
  color: string,
}

export interface CreateTag {
  name: string,
  description: string,
  color: string,
}


export interface UpdateTag {
  name: string,
  description: string,
  color: string
}