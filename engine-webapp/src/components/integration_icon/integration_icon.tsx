/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IconAssembly } from '@tabler/icons-react';
import Image from 'next/image';

interface IntegrationIconProps {
  width: number;
  height: number;
  icon: string;
}

export function IntegrationIcon({ width, height, icon }: IntegrationIconProps) {
  if (icon === 'custom.svg') {
    return <IconAssembly width={width} height={height} />;
  }

  return (
    <Image src={`/icons/${icon}`} alt="logo" width={width} height={height} />
  );
}
