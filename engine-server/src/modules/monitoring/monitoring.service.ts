/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Injectable, Logger } from '@nestjs/common';

import { HiveService } from 'modules/hive/hive.service';

@Injectable()
export class MonitoringService {
  private readonly logger = new Logger(MonitoringService.name);

  constructor(private hiveService: HiveService) {}

  async getOperations(
    _organisation: string,
    _project: string,
    from: string,
    to: string,
  ) {
    this.logger.log('Querying operations from Hive');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const operationsQuery: any = {
      query:
        'query operationsStats($selector: OperationsStatsSelectorInput!) {\n  operationsStats(selector: $selector) {\n    operations {\n      nodes {\n        ...OperationStatsFields\n        __typename\n      }\n      total\n      __typename\n    }\n    __typename\n  }\n}\nfragment OperationStatsFields on OperationStats {\n  id\n  operationHash\n  name\n  kind\n  count\n  countOk\n  percentage\n  duration {\n    p75\n    p90\n    p95\n    p99\n    __typename\n  }\n}',
      operationName: 'operationsStats',
      variables: {
        selector: {
          organization: 'cleienp9m0000gnmx50e1quxx',
          project: 'default',
          target: 'production',
          period: {
            from,
            to,
          },
          operations: [],
        },
      },
    };
    const accessToken = await this.hiveService.login();
    const response = await this.hiveService.post(operationsQuery, accessToken);

    return response.data.operationsStats;
  }

  async getGeneralStats(
    _organisation: string,
    _project: string,
    from: string,
    to: string,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const generalStatsQuery: any = {
      query:
        'query generalOperationsStats($selector: OperationsStatsSelectorInput!, $resolution: Int!) {\n  operationsStats(selector: $selector) {\n    ... on OperationsStats {\n      totalRequests\n      totalFailures\n      totalOperations\n      duration {\n        p75\n        p90\n        p95\n        p99\n        __typename\n      }\n      __typename\n    }\n    ... on OperationsStats {\n      failuresOverTime(resolution: $resolution) {\n        date\n        value\n        __typename\n      }\n      requestsOverTime(resolution: $resolution) {\n        date\n        value\n        __typename\n      }\n      durationOverTime(resolution: $resolution) {\n        date\n        duration {\n          p75\n          p90\n          p95\n          p99\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on OperationsStats {\n      clients {\n        nodes {\n          name\n          count\n          percentage\n          versions {\n            version\n            count\n            percentage\n            __typename\n          }\n          __typename\n        }\n        total\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}',
      operationName: 'generalOperationsStats',
      variables: {
        selector: {
          organization: 'cleienp9m0000gnmx50e1quxx',
          project: 'default',
          target: 'production',
          period: {
            from,
            to,
          },
          operations: [],
        },
        resolution: 90,
      },
    };

    const accessToken = await this.hiveService.login();
    const response = await this.hiveService.post(
      generalStatsQuery,
      accessToken,
    );

    return response.data.operationsStats;
  }
}
