/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { useMutation } from 'react-query';
import { ajaxPost } from 'utils';

export interface SignInParams {
  email: string;
  password: string;
}

export interface UserInfo {
  status: string;
  user: User;
}

export interface User {
  email: string;
  id: string;
  timeJoined: number;
}

export function siginUser(params: SignInParams) {
  return ajaxPost({
    url: '/api/auth/signin',
    data: {
      formFields: [
        {
          id: 'email',
          value: params.email,
        },
        {
          id: 'password',
          value: params.password,
        },
      ],
    },
  });
}

export interface MutationParams {
  onMutate?: () => void;
  onSuccess?: (data: UserInfo) => void;
  onError?: (error: string) => void;
}

export function useSignInMutation({
  onMutate,
  onSuccess,
  onError,
}: MutationParams) {
  const onMutationTriggered = () => {
    onMutate && onMutate();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onMutationError = (errorResponse: any) => {
    const errorText = errorResponse?.errors?.message || 'Error occured';

    onError && onError(errorText);
  };

  const onMutationSuccess = (data: UserInfo) => {
    onSuccess && onSuccess(data);
  };

  return useMutation(siginUser, {
    onError: onMutationError,
    onMutate: onMutationTriggered,
    onSuccess: onMutationSuccess,
  });
}
