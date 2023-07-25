/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationAccount } from '@@generated/integrationAccount/entities/integrationAccount.entity';
import { useMutation } from 'react-query';
import { ajaxPost } from 'utils';
import { SYNC_OPTION_ENUM } from 'utils/sync';

export interface CreateIntegrationAccountParams {
  integrationDefinitionId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any;
  authType: string;
  workspaceId: string;
  integrationAccountName: string;

  syncEnabled?: boolean;
  syncPeriod?: SYNC_OPTION_ENUM;
}

export interface CreateIntegrationAccountWithoutWorkspaceParams {
  integrationDefinitionId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any;
  authType: string;
  integrationAccountName: string;
  accountIdentifier: string;
  linkId: string;
}

export function createIntegrationAccount(
  params: CreateIntegrationAccountParams,
) {
  return ajaxPost({
    url: '/api/v1/integration_account',
    data: params,
  });
}

export function createIntegrationAccountWithLink({
  linkId,
  ...params
}: CreateIntegrationAccountWithoutWorkspaceParams) {
  return ajaxPost({
    url: `/api/v1/integration_account/link/${linkId}`,
    data: params,
  });
}

export interface MutationParams {
  onMutate?: () => void;
  onSuccess?: (data: IntegrationAccount) => void;
  onError?: (error: string) => void;
}

export function useCreateIntegrationAccountMutation({
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

  return useMutation(createIntegrationAccount, {
    onError: onMutationError,
    onMutate: onMutationTriggered,
    onSuccess: onMutationSuccess,
  });
}

export function useCreateIntegrationAccountWithLinkMutation({
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

  return useMutation(createIntegrationAccountWithLink, {
    onError: onMutationError,
    onMutate: onMutationTriggered,
    onSuccess: onMutationSuccess,
  });
}
