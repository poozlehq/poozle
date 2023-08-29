/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Comment } from '@poozle/engine-idk';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertComment(data: any): Comment {
  // return {
  //   id: data.id,
  //   ticket_id: data.issue_url.match(/\/(\d+)$/)?.[1],
  //   body: data.body,
  //   html_body: '',
  //   is_private: false,
  //   created_by_id: data.user.id,
  //   created_by: data.user.login,
  //   created_at: data.created_at,
  //   updated_at: data.updated_at,
  // };

   /** 
   * TODO: The above is a mapping we used in Github. But you need to
   * write mapping specific to the current integration
  */
}
