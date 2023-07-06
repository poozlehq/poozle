/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationOAuthApp } from '@@generated/integrationOAuthApp/entities';
import { useMutation } from 'react-query';
import { ajaxPost } from 'utils';

export interface UpdateIntegrationOAuthAppParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clientId: string;
  clientSecret: string;
  scopes: string;
  integrationOAuthAppName: string;
  integrationOAuthAppId: string;
}

export function updateIntegrationOAuthApp({
  integrationOAuthAppId,
  ...params
}: UpdateIntegrationOAuthAppParams) {
  return ajaxPost({
    url: `/api/v1/integration_oauth/${integrationOAuthAppId}`,
    data: params,
  });
}

interface MutationParams {
  onMutate?: () => void;
  onSuccess?: (data: IntegrationOAuthApp) => void;
  onError?: (error: string) => void;
}

export function useUpdateIntegrationOAuthAppMutation({
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
