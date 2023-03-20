/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Analytics } from '@segment/analytics-node';

/**
 * This service is used to track the usage of the product
 * We will use this data to
 */
@Injectable()
export class AnalyticsService {
  analytics: Analytics;
  trackingEnabled: boolean;

  constructor(configService: ConfigService) {
    const SEGMENT_KEY = configService.get('SEGMENT_KEY');
    if (SEGMENT_KEY) {
      this.trackingEnabled = true;
      this.analytics = new Analytics({
        writeKey: SEGMENT_KEY,
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  track(userEmail: string, event: string, properties: any = {}) {
    if (this.trackingEnabled) {
      this.analytics.track({ userId: userEmail, event, properties });
    }
  }
}
