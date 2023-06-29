/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationAccount } from '@@generated/integrationAccount/entities';
import { useMutation } from 'react-query';
import { ajaxPost } from 'utils';

export interface UpdateIntegrationAccountParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any;
  integrationAccountName: string;
  authType: string;
  integrationAccountId: string;
}

export function updateIntegrationAccount({
  integrationAccountId,
  ...params
}: UpdateIntegrationAccountParams) {
  return ajaxPost({
    url: `/api/v1/integration_account/${integrationAccountId}`,
    data: params,
  });
}

interface MutationParams {
  onMutate?: () => void;
  onSuccess?: (data: IntegrationAccount) => void;
  onError?: (error: string) => void;
}

export function useUpdateIntegrationAccountMutation({
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

  const onMutationSuccess = (data: IntegrationAccount) => {
    onSuccess && onSuccess(data);
  };

  return useMutation(updateIntegrationAccount, {
    onError: onMutationError,
    onMutate: onMutationTriggered,
    onSuccess: onMutationSuccess,
  });
}
