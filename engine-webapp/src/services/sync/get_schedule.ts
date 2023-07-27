/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Job } from '@@generated/job/entities';
import { UseQueryResult, useQuery } from 'react-query';
import { XHRErrorResponse, ajaxGet } from 'utils';

/**
 * Query Key for Get user.
 */
export const GetSyncSchedule = 'getSyncSchedule';

interface SyncSchedule {
  jobs: Job;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schedule: any;
}

interface SyncSchedulesParams {
  integrationAccountId: string;
}

export function getSyncSchedule(params: SyncSchedulesParams) {
  return ajaxGet({
    url: `/api/v1/sync/${params.integrationAccountId}/jobs`,
  });
}

export function useGetSyncScheduleQuery(
  queryParams: SyncSchedulesParams,
): UseQueryResult<SyncSchedule, XHRErrorResponse> {
  return useQuery(
    [GetSyncSchedule, queryParams],
    () => getSyncSchedule(queryParams),
    {
      notifyOnChangeProps: 'tracked',
      retry: 1,
      refetchOnWindowFocus: false, // Frequency of Change would be Low
    },
  );
}
