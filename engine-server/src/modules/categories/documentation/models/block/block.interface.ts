/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { ApiProperty } from '@nestjs/swagger';
import { Meta, BlockType } from '@poozle/engine-idk';
import { IsArray, IsOptional, IsString, IsEnum } from 'class-validator';

import { QueryParams, JustRawParams } from 'common/interfaces/query.interface';

export class ListBlocksQueryParams extends QueryParams {}

export class CommonBlockQueryParams extends JustRawParams {}

export class PathParamsWithParentId {
  /**
   * This will be parent id of the block you want to create
   */
  @IsString()
  parent_id: string;
}

export class PathParamsWithBlockId {
  /**
   * Block id of the block you want to update
   */
  @IsString()
  block_id: string;
}

export class BlockContent {
  /**
   * All the properties about the text
   */
  annotations: {
    bold: string;
    italic: string;
    strikethrough: string;
    underline: string;
    code: string;
    color: string;
  };

  /**
   * The text in the block
   */
  plain_text: string;

  /**
   * All the properties about the text
   */
  href: string;
}

export class Block {
  /**
   * A unique identifier for the block.
   */
  id: string;

  /**
   * Id of the parent block
   */
  parent_id?: string;

  @ApiProperty({
    enum: BlockType,
    description: 'Type of the block',
  })
  block_type: BlockType;

  /**
   * Content of the block
   */
  content: BlockContent[];

  /**
   * Block children
   */
  children: Block[];
}

export class BlocksResponse {
  data: Block;
  meta?: Meta;
}

export class Annotations {
  @IsOptional()
  @IsString()
  bold: string;

  @IsOptional()
  @IsString()
  italic: string;

  @IsOptional()
  @IsString()
  strikethrough: string;

  @IsOptional()
  @IsString()
  underline: string;

  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  color: string;
}

export class Content {
  @IsOptional()
  annotations: Annotations;

  /**
   * Text for the block
   */
  @IsOptional()
  @IsString()
  plain_text: string;

  /**
   * Link for the block. Example blocks: Youtube, Bookmarks
   */
  @IsOptional()
  @IsString()
  href: string;
}

export class PageBody {
  @ApiProperty({
    enum: BlockType,
    description: 'Type of the block',
  })
  @IsString()
  @IsEnum(BlockType)
  block_type: string;

  /**
   * Content of the block
   */
  @IsArray()
  content: Content[];
}

export class UpdatePageBody extends PageBody {}

export class CreatePageBody {
  @IsArray()
  data: PageBody[];
}
