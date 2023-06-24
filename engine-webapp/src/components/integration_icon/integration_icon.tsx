/** Copyright (c) 2023, Poozle, all rights reserved. **/

import Image from 'next/image';

interface IntegrationIconProps {
  width: number;
  height: number;
  icon: string;
}

export function IntegrationIcon({ width, height, icon }: IntegrationIconProps) {
  return (
    <Image src={`/icons/${icon}`} alt="logo" width={width} height={height} />
  );
}
