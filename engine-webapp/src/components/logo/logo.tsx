/** Copyright (c) 2023, Poozle, all rights reserved. **/

import Image from 'next/image';

interface LogoProps {
  width: number;
  height: number;
}

export function Logo({ width, height }: LogoProps) {
  return <Image src="/logo.svg" alt="logo" width={width} height={height} />;
}
