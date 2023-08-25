/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationType } from 'lib/integration_type';

export enum SYNC_OPTION_ENUM {
  EVERY_HALF_DAY = 'EVERY_HALF_DAY',
  EVERY_HALF_HOUR = 'EVERY_HALF_HOUR',
  EVERY_QUARTER_HOUR = 'EVERY_QUARTER_HOUR',
  EVERY_HOUR = 'EVERY_HOUR',
  EVERY_DAY = 'EVERY_DAY',
}

export const SYNC_OPTIONS = {
  EVERY_HALF_DAY: 'every half day',
  EVERY_HALF_HOUR: 'every half hour',
  EVERY_QUARTER_HOUR: 'every quarter hour',
  EVERY_HOUR: 'every hour',
  EVERY_DAY: 'every day',
};

export const SYNC_SUPPORTED_CATEGORIES: IntegrationType[] = [
  IntegrationType.TICKETING,
  IntegrationType.PAYMENTS,
];

export function isSyncEnabled(integrationType: IntegrationType): boolean {
  return SYNC_SUPPORTED_CATEGORIES.includes(integrationType);
}
