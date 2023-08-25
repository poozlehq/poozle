/** Copyright (c) 2023, Poozle, all rights reserved. **/

export enum IntegrationType {
  HRIS = 'HRIS',
  MESSAGING = 'MESSAGING',
  CALENDAR = 'CALENDAR',
  TICKETING = 'TICKETING',
  MAIL = 'MAIL',
  DOCUMENTATION = 'DOCUMENTATION',
  PAYMENTS = 'PAYMENTS',
}

export const IntegrationTypeSelectData: Record<IntegrationType, string> = {
  HRIS: 'HRIS',
  MESSAGING: 'Messaging',
  CALENDAR: 'Calendar',
  TICKETING: 'Ticketing',
  MAIL: 'Mail',
  DOCUMENTATION: 'Documentation',
  PAYMENTS: 'Payments',
};
