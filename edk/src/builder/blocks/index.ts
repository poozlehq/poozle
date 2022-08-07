/* eslint-disable max-len */

import { DividerBuilder, DividerParams } from './divider';
import { FileBuilder, FileParams } from './file';
import { HeaderBuilder, HeaderParams } from './header';
import { ImageBuilder, ImageParams } from './image';
import { InputBuilder, InputParams } from './input';
import { SectionBuilder, SectionParams } from './section';
import { VideoBuilder, VideoParams } from './video';

export type {
  DividerBuilder,
  DividerParams,
  FileBuilder,
  FileParams,
  HeaderBuilder,
  HeaderParams,
  ImageBuilder,
  ImageParams,
  InputBuilder,
  InputParams,
  SectionBuilder,
  SectionParams,
  VideoBuilder,
  VideoParams,
};

export function Divider(params?: DividerParams): DividerBuilder {
  return new DividerBuilder(params);
}

export function File(params?: FileParams): FileBuilder {
  return new FileBuilder(params);
}

export function Header(params?: HeaderParams): HeaderBuilder {
  return new HeaderBuilder(params);
}

export function Image(params?: ImageParams): ImageBuilder {
  return new ImageBuilder(params);
}

export function Input(params?: InputParams): InputBuilder {
  return new InputBuilder(params);
}

export function Section(params?: SectionParams): SectionBuilder {
  return new SectionBuilder(params);
}

export function Video(params?: VideoParams): VideoBuilder {
  return new VideoBuilder(params);
}

const blocks = {
  Divider,
  File,
  Header,
  Image,
  Input,
  Section,
  Video,
};

// Strange export. I know. For IDE highlighting purposes.

export { blocks as Blocks };
