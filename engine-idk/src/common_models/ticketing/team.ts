export const TeamSchema = {
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
    members: {
      type: 'array',
      default: [],
      items: [
        {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              default: '',
            },
            username: {
              type: 'string',
              default: '',
            },
          },
          required: ['id', 'username'],
        },
      ],
    },
  },
};

export interface Member {
  id: string;
  username: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  members: Member[];
}

export interface createTeam {
  name: string;
  description: string;
  memberts: Exclude<Member, 'username'>[];
}

export interface updateTeam {
  name: string;
  description: string;
  memberts: Exclude<Member, 'username'>[];
}
