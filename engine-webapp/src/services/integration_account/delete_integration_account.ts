/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationAccount } from '@@generated/integrationAccount/entities';
import { useMutation } from 'react-query';
import { ajaxDelete } from 'utils';

interface IntegrationAccountsParams {
  integrationAccountId: string;
}

interface MutationParams {
  onMutate?: () => void;
  onSuccess?: (data: IntegrationAccount) => void;
  onError?: (error: string) => void;
}

export function deleteIntegrationAccount(params: IntegrationAccountsParams) {
  return ajaxDelete({
    url: `/api/v1/integration_account/${params.integrationAccountId}`,
  });
}

export function useDeleteIntegrationAccount({
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

  return useMutation(deleteIntegrationAccount, {
    onError: onMutationError,
    onMutate: onMutationTriggered,
    onSuccess: onMutationSuccess,
  });
}
