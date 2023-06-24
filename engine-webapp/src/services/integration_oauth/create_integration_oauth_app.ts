/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationOAuthApp } from '@@generated/integrationOAuthApp.entity';
import { useMutation } from 'react-query';
import { ajaxPost } from 'utils';

export interface CreateIntegrationOAuthParams {
  integrationDefinitionId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  workspaceId: string;
  clientId: string;
  clientSecret: string;
  scopes: string;
  integrationOAuthAppName: string;
}

export function createIntegrationOAuth(params: CreateIntegrationOAuthParams) {
  return ajaxPost({
    url: '/api/v1/integration_oauth',
    data: params,
  });
}

export interface MutationParams {
  onMutate?: () => void;
  onSuccess?: (data: IntegrationOAuthApp) => void;
  onError?: (error: string) => void;
}

export function useCreateIntegrationOAuthMutation({
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

  return useMutation(createIntegrationOAuth, {
    onError: onMutationError,
    onMutate: onMutationTriggered,
    onSuccess: onMutationSuccess,
  });
}
