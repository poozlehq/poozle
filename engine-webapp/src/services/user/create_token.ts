/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { useMutation } from 'react-query';
import { ajaxPost } from 'utils';

export class CreateTokenBody {
  name: string;
  seconds: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Token = any;

export function createToken(params: CreateTokenBody) {
  return ajaxPost({
    url: '/api/v1/user/token',
    data: params,
  });
}

export interface MutationParams {
  onMutate?: () => void;
  onSuccess?: (data: Token) => void;
  onError?: (error: string) => void;
}

export function useCreateTokenMutation({
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

  const onMutationSuccess = (data: Token) => {
    onSuccess && onSuccess(data);
  };

  return useMutation(createToken, {
    onError: onMutationError,
    onMutate: onMutationTriggered,
    onSuccess: onMutationSuccess,
  });
}
