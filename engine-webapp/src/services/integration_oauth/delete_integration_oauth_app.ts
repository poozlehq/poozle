/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationOAuthApp } from '@@generated/integrationOAuthApp/entities';
import { useMutation } from 'react-query';
import { ajaxDelete } from 'utils';

export interface DeleteIntegrationOAuthAppParams {
  integrationOAuthAppId: string;
}

export function updateIntegrationOAuthApp({
  integrationOAuthAppId,
}: DeleteIntegrationOAuthAppParams) {
  return ajaxDelete({
    url: `/api/v1/integration_oauth/${integrationOAuthAppId}`,
  });
}

interface MutationParams {
  onMutate?: () => void;
  onSuccess?: (data: IntegrationOAuthApp) => void;
  onError?: (error: string) => void;
}

export function useDeleteIntegrationOAuthAppMutation({
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

  const onMutationSuccess = (data: IntegrationOAuthApp) => {
    onSuccess && onSuccess(data);
  };

  return useMutation(updateIntegrationOAuthApp, {
    onError: onMutationError,
    onMutate: onMutationTriggered,
    onSuccess: onMutationSuccess,
  });
}
