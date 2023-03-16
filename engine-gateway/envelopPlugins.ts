/** Copyright (c) 2023, Poozle, all rights reserved. **/
import { ValidateUserFn, useGenericAuth } from '@envelop/generic-auth';
import { ResolveUserFn } from '@envelop/generic-auth';
import * as jwt from 'jsonwebtoken';

interface UserType {
  id: string;
}

interface Payload {
  workspaceId: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resolveUserFn: ResolveUserFn<UserType> = async (context: any) => {
  try {
    const token = context.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET) as Payload;

    return { id: payload.workspaceId, ...payload };
  } catch (e) {
    console.log(e);
    console.error('Failed to validate token');

    return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateUser: ValidateUserFn<any> = (params: any) => {
  try {
    if (params.user.workspaceId !== process.env.WORKSPACE_ID) {
      throw new Error(`Unauthenticated!. Unable to verify access token`);
    }
  } catch (e) {
    console.log(e);
    throw new Error(`Unauthenticated!. Unable to verify access token`);
  }
};

const plugins = [
  useGenericAuth({
    resolveUserFn,
    validateUser,
    mode: 'protect-all',
  }),
];

export default plugins;
