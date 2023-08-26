/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Badge } from '@mantine/core';
import { IntegrationType as IntegrationTypeEnum } from 'lib/integration_type';

interface IntegrationTypeProps {
  type: IntegrationTypeEnum;
}

const colorMap: Record<IntegrationTypeEnum, string> = {
  HRIS: 'cyan',
  MESSAGING: 'teal',
  CALENDAR: 'blue',
  TICKETING: 'indigo',
  MAIL: 'purple',
  DOCUMENTATION: 'grape',
  PAYMENTS: 'orange'
};

export function IntegrationType({ type }: IntegrationTypeProps) {
  return <Badge color={colorMap[type] ?? 'teal'}>{type}</Badge>;
}
