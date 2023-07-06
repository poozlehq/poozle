/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Badge } from '@mantine/core';

export enum ReleaseStageEnum {
  ALPHA = 'ALPHA',
  BETA = 'BETA',
  GENERALLY_AVAILABLE = 'GENERALLY_AVAILABLE',
  CUSTOM = 'CUSTOM',
}

interface ReleaseStageProps {
  type: ReleaseStageEnum;
}

const colorMap = {
  ALPHA: 'cyan',
  BETA: 'teal',
  GENERALLY_AVAILABLE: 'blue',
  CUSTOM: 'indigo',
};

export function ReleaseStage({ type }: ReleaseStageProps) {
  return <Badge color={colorMap[type] ?? 'teal'}>{type}</Badge>;
}
