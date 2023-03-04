/** Copyright (c) 2023, Poozle, all rights reserved. **/

import Image from 'next/image';

interface ExtensionIconProps {
  width: number;
  height: number;
  icon: string;
}

export function ExtensionIcon({ width, height, icon }: ExtensionIconProps) {
  return (
    <Image src={`/icons/${icon}`} alt="logo" width={width} height={height} />
  );
}
