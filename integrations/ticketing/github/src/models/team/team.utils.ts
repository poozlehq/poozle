/** Copyright (c) 2023, Poozle, all rights reserved. **/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertTeam(data: any) {
    return {
        id: data.id,
        name: data.name,
        description: data.description,
    };
  }
  
  export const teamMapping = {
    name: 'name',
    description: 'description',
    members: 'maintainers',
  };
  
