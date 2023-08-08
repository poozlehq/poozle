/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Block, BlockType, Content } from '@poozle/engine-idk';
import { ConfluenceType, confluenceType } from './block.interface';

export function convertUpdateBody(data: Block) {
  return {
    [data.block_type]: {
      rich_text: data.content.map((contentData: Content) => {
        return {
          type: 'text',
          text: {
            content: contentData.plain_text,
            link: contentData.href ? { url: contentData.href } : null,
          },
        };
      }),
    },
  };
}

export function convertAppendBody(data: Block[]) {
  return {
    children: data.map((blockData: Block) => {
      return {
        object: 'block',
        type: blockData.block_type,
        [blockData.block_type]: {
          rich_text: blockData.content.map((contentData: Content) => {
            return {
              type: 'text',
              text: {
                content: contentData.plain_text,
                link: contentData.href ? { url: contentData.href } : null,
              },
            };
          }),
        },
      };
    }),
  };
}

function createBlock(type: BlockType, content: Content[], children: Block[]): Block {
  return {
    id: '',
    parent_id: '',
    block_type: type,
    content,
    children,
  } as Block;
}

// This is for generating id
let id = 1;

export function processBlock(block: Block, raw: any, childId?: number, parentId?: string): Block {
  let newBlockId = childId ? `${parentId}_${childId}` : (id++).toString();

  let newBlock = {
    ...block,
    ...(raw ? { raw } : {}),
    id: newBlockId,
    parent_id: parentId ?? null,
  } as Block;

  if (newBlock.children) {
    let childId = 1;
    newBlock.children = newBlock.children.map((child: any) => {
      let newChild = processBlock(child, null, childId++, newBlockId);
      newChild.parent_id = newBlock.id.toString();
      return newChild;
    });
  }

  return newBlock;
}

export function getBlockData(data: any): Block[] {
  const type = confluenceType[data.type as keyof ConfluenceType];
  let blockContent: Content[];
  let blockChildren: Block[];
  switch (type) {
    case BlockType.numbered_list_item:
    case BlockType.bulleted_list_item:
      return data.content.map((item: any) => {
        blockContent = item.content ? extractContent(item.content[0]) : [];
        blockChildren =
          item.content
            ?.slice(1)
            ?.map((item: any) => getBlockData(item))
            .flat() || [];
        return createBlock(type, blockContent, blockChildren);
      });

    case BlockType.table:
    case BlockType.table_row:
      blockChildren = data.content?.map((item: any) => getBlockData(item)).flat() || [];
      return [createBlock(type, [], blockChildren)];

    case BlockType.table_header:
    case BlockType.table_cell:
      blockContent = data.content.map((tableItem: any) => extractContent(tableItem).flat()).flat();
      return [createBlock(type, blockContent, [])];

    case BlockType.toggle:
      blockContent = extractContent(data);
      blockChildren = data.content?.map((item: any) => getBlockData(item)).flat() || [];
      return [createBlock(type, blockContent, blockChildren)];

    case BlockType.heading_1:
      const headingType =
        confluenceType[`${data.type}_${data.attrs.level}` as keyof ConfluenceType];

      return [createBlock(headingType, extractContent(data), [])];

    case BlockType.unsupported:
      blockChildren = data.content?.map((item: any) => getBlockData(item)).flat() || [];
      return [createBlock(type, extractContent(data), blockChildren)];

    case BlockType.quote:
      blockContent = data.content?.map((item: any) => extractContent(item)).flat() || [];
      return [createBlock(type, blockContent, [])];

    default:
      blockContent = extractContent(data);
      return [createBlock(type, blockContent, [])];
  }
}

function createContent(plain_text: string | null, href: string | null): Content {
  return {
    annotations: {
      bold: null as string | null,
      italic: null as string | null,
      strikethrough: null as string | null,
      underline: null as string | null,
      code: null as string | null,
      color: null as string | null,
    },
    plain_text: plain_text,
    href: href,
  } as Content;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractContent(data: any): Content[] {
  const type = confluenceType[data.type as keyof ConfluenceType];

  switch (type) {
    case BlockType.paragraph:
    case BlockType.code:
    case BlockType.list_item:
    case BlockType.table_header:
    case BlockType.table_cell:
    case BlockType.heading_1:
      return 'content' in data
        ? data.content?.map((dataContent: any) => {
            const dataContentType = confluenceType[dataContent.type as keyof ConfluenceType];
            switch (dataContentType) {
              case BlockType.text:
                const annotationLinks = getAnnotationsAndLinks(dataContent);
                return {
                  annotations: annotationLinks.annotations,
                  href: annotationLinks.link,
                  plain_text: dataContent.text ?? '',
                };

              case BlockType.inline_card:
                return createContent(null, dataContent.attrs.url);

              case BlockType.date:
                return createContent(dataContent.attrs.timestamp, null);

              default:
                return [];
            }
          })
        : [];

    case BlockType.block_card:
      return [createContent(null, data.attrs.url)];

    case BlockType.file:
      return 'content' in data
        ? data.content?.map((media: any) => {
            return createContent(media.attrs.id ?? null, null);
          })
        : [];

    case BlockType.toggle:
      return [createContent(data.attrs.title, null)];

    case BlockType.numbered_list_item:
    case BlockType.bulleted_list_item:
      return (
        data.content?.map((item: any) => {
          const itemContent =
            item.content?.find((contentItem: any) => contentItem.type === 'paragraph')?.content ||
            [];
          const plainText =
            itemContent.find((contentItem: any) => contentItem.type === 'text')?.text || '';

          return {
            annotations: {
              bold: null as string | null,
              italic: null as string | null,
              strikethrough: null as string | null,
              underline: null as string | null,
              code: null as string | null,
              color: null as string | null,
            },
            plain_text: plainText,
            href: null as string | null,
          } as Content;
        }) || []
      );

    case BlockType.unsupported:
      return [
        {
          annotations: {
            bold: null as string | null,
            italic: null as string | null,
            strikethrough: null as string | null,
            underline: null as string | null,
            code: null as string | null,
            color: null as string | null,
          },
          plain_text: data.attrs.parameters.macroMetadata.title,
          href: null as string | null,
        },
      ] as Content[];

    default:
      return [];
  }
}

export function getAnnotationsAndLinks(data: any) {
  let annotations = {
    bold: null as string | null,
    italic: null as string | null,
    strikethrough: null as string | null,
    underline: null as string | null,
    code: null as string | null,
    color: null as string | null,
    superscript: null as string | null,
    subscript: null as string | null,
  };
  let link = null as string | null;
  if ('marks' in data) {
    data.marks?.map((mark: any) => {
      switch (mark.type) {
        case 'textColor':
          annotations.color = mark.attrs.color;
          break;
        case 'strong':
          annotations.bold = 'true';
          break;
        case 'em':
          annotations.italic = 'true';
          break;
        case 'subsup':
          annotations.superscript = 'true';
          break;
        case 'subsup':
          annotations.subscript = 'true';
          break;
        case 'code':
          annotations.code = 'true';
          break;
        case 'underline':
          annotations.underline = 'true';
          break;
        case 'link':
          link = mark.attrs.href;
      }
    });
  }
  return { annotations, link };
}
