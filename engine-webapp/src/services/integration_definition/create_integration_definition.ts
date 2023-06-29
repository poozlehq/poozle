/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationDefinition } from '@@generated/integrationDefinition/entities';
import { useMutation } from 'react-query';
import { ajaxPost } from 'utils';

import { IntegrationTypeEnum } from 'components';

export class IntegrationDefinitionCreateBody {
  name: string;
  sourceUrl: string;
  integrationType: IntegrationTypeEnum;
  workspaceId: string;
}
export function createIntegrationDefinition(
  params: IntegrationDefinitionCreateBody,
) {
  return ajaxPost({
    url: '/api/v1/integration_definition',
    data: params,
  });
}

export interface MutationParams {
  onMutate?: () => void;
  onSuccess?: (data: IntegrationDefinition) => void;
  onError?: (error: string) => void;
}

export function useCreateIntegrationDefinitionMutation({
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

  return useMutation(createIntegrationDefinition, {
    onError: onMutationError,
    onMutate: onMutationTriggered,
    onSuccess: onMutationSuccess,
  });
}
