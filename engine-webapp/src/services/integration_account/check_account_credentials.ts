/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { useMutation } from 'react-query';
import { ajaxPost } from 'utils';

export interface CheckCredentialsParams {
  integrationDefinitionId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any;
  authType: string;
  workspaceId: string;
}

export interface CheckResult {
  status: boolean;
  error: string;
}

export function checkCredentials(params: CheckCredentialsParams) {
  return ajaxPost({
    url: '/api/v1/integration_account/check',
    data: params,
  });
}

interface MutationParams {
  onMutate?: () => void;
  onSuccess?: (data: CheckResult) => void;
  onError?: (error: string) => void;
}

export function useCheckCredentialsMutation({
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

  const onMutationSuccess = (data: CheckResult) => {
    onSuccess && onSuccess(data);
  };

  return useMutation(checkCredentials, {
    onError: onMutationError,
    onMutate: onMutationTriggered,
    onSuccess: onMutationSuccess,
  });
}
