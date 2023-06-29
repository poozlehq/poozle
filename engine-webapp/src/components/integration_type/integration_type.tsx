/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Badge } from '@mantine/core';

export enum IntegrationTypeEnum {
  HRIS = 'HRIS',
  MESSAGING = 'MESSAGING',
  CALENDAR = 'CALENDAR',
  TICKETING = 'TICKETING',
  EMAIL = 'EMAIL',
}

interface IntegrationIconProps {
  type: IntegrationTypeEnum;
}

const colorMap = {
  HRIS: 'cyan',
  MESSAGING: 'teal',
  CALENDAR: 'blue',
  TICKETING: 'indigo',
  EMAIL: 'cyan',
};

export function IntegrationType({ type }: IntegrationIconProps) {
  return <Badge color={colorMap[type] ?? 'teal'}>{type}</Badge>;
}
