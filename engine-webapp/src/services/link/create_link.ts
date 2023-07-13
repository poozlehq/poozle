/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationType } from 'lib/integration_type';
import { useMutation } from 'react-query';
import { ajaxPost } from 'utils';

import { LinkResponse } from './link.interface';

export interface CreateLinkParams {
  category: IntegrationType[];
  expiresIn: number;
  linkName: string;
  workspaceId: string;

  preferOAuth: boolean;
  canExpire: boolean;
}

export function createLink(params: CreateLinkParams) {
  return ajaxPost({
    url: '/api/v1/link',
    data: params,
  });
}

export interface MutationParams {
  onMutate?: () => void;
  onSuccess?: (data: LinkResponse) => void;
  onError?: (error: string) => void;
}

export function useCreateLinkMutation({
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

  const onMutationSuccess = (data: LinkResponse) => {
    onSuccess && onSuccess(data);
  };

  return useMutation(createLink, {
    onError: onMutationError,
    onMutate: onMutationTriggered,
    onSuccess: onMutationSuccess,
  });
}
