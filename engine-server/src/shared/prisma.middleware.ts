/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Prisma } from '@prisma/client';

export function prismaDeleteSoftlyMiddleware(): Prisma.Middleware {
  return async (params, next) => {
    // Check incoming query type
    if (params.action === 'delete') {
      // Delete queries
      // Change action to an update
      params.action = 'update';
      params.args['data'] = { deleted: true };
    }
    if (params.action === 'deleteMany') {
      // Delete many queries
      params.action = 'updateMany';
      if (params.args.data !== undefined) {
        params.args.data['deleted'] = true;
      } else {
        params.args['data'] = { deleted: true };
      }
    }

    return next(params);
  };
}
