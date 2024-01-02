/** Copyright (c) 2023, Poozle, all rights reserved. **/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertTicketType = (data: any) => {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    iconUrl: data.iconUrl,
  };
};
