/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationDefinition } from '@@generated/integrationDefinition/entities';
import { useMutation } from 'react-query';
import { ajaxPost } from 'utils';

export interface UpdateIntegrationDefinitionParams {
  sourceUrl: string;
  version: string;
  integrationDefinitionId: string;
}

export function updateIntegrationDefinition({
  integrationDefinitionId,
  ...params
}: UpdateIntegrationDefinitionParams) {
  return ajaxPost({
    url: `/api/v1/integration_definition/${integrationDefinitionId}`,
    data: params,
  });
}

interface MutationParams {
  onMutate?: () => void;
  onSuccess?: (data: IntegrationDefinition) => void;
  onError?: (error: string) => void;
}

export function useUpdateIntegrationDefinitionMutation({
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

  const onMutationSuccess = (data: IntegrationDefinition) => {
    onSuccess && onSuccess(data);
  };

  return useMutation(updateIntegrationDefinition, {
    onError: onMutationError,
    onMutate: onMutationTriggered,
    onSuccess: onMutationSuccess,
  });
}
