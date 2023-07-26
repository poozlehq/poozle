/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Block, BlockType, Content, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

export interface SingleBlockResponse {
  object: string;
  id: string;
  parent: Record<string, string>;
  created_time: string;
  last_edited_time: string;
  created_by: Record<string, string>;
  last_edited_by: Record<string, string>;
  has_children: boolean;
  archived: boolean;
  type: BlockType;

  // TODO (harshith): fix the types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  children?: SingleBlockResponse[];
}

export interface BlockResponse {
  blocks: SingleBlockResponse[];
  meta: {
    has_more: boolean;
    next_cursor: string;
  };
}

interface ConfluenceType {
  [key: string]: BlockType; // Map type strings to BlockType
}
const confluenceType: ConfluenceType = {
  paragraph: BlockType.paragraph,
  bulletList: BlockType.bulleted_list_item,
  codeBlock: BlockType.code,
  mediaSingle: BlockType.file,
  orderedList: BlockType.numbered_list_item,
  extension: BlockType.unsupported,
  table: BlockType.table,
  table_row: BlockType.table_row,
  table_header: BlockType.table_header,
  inlineCard: BlockType.inline_card,
  text: BlockType.text,
  blockCard: BlockType.block_card,
  listItem: BlockType.list_item,
  nestedExpand: BlockType.toggle,
  expand: BlockType.toggle,
};

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

export async function fetchBlockChildren(
  block: SingleBlockResponse,
  headers: AxiosHeaders,
): Promise<any> {
  const childUrl = `sdfa/blocks/${block.id.replace(/-/g, '')}/children`;

  const params = {
    page_size: 100,
  };

  const response = await axios({ url: childUrl, headers, params });
  let results = response.data.results;
  let has_more = response.data.has_more;
  let next_cursor = response.data.has_more ? response.data.next_cursor : '';

  while (has_more) {
    const next_response = await axios({
      url: childUrl,
      headers,
      params: {
        start_cursor: next_cursor,
      },
    });

    results = results.concat(next_response.data.results);

    has_more = next_response.data.has_more;
    next_cursor = next_response.data.has_more ? next_response.data.next_cursor : '';
  }

  results = await Promise.all(
    results?.map(async (block: SingleBlockResponse) => {
      if (block.has_children) {
        const children = await fetchBlockChildren(block, headers);
        return { ...block, children: children.blocks };
      }

      return block;
    }),
  );

  return {
    blocks: results,
  };
}

export async function fetchPageBlocks(
  url: string,
  headers: AxiosHeaders,
  params: Params,
): Promise<BlockResponse> {
  const limit = params.queryParams?.limit ? parseInt(params.queryParams?.limit.toString()) : 10;

  const final_params = {
    page_size: limit,
    ...(params.queryParams?.cursor ? { start_cursor: params.queryParams?.cursor } : {}),
  };

  const response = await axios({ url, headers, params: final_params });
  let results = response.data.results;

  results = await Promise.all(
    results?.map(async (block: SingleBlockResponse) => {
      if (block.has_children) {
        const children = await fetchBlockChildren(block, headers);

        return { ...block, children: children.blocks };
      }

      return block;
    }),
  );

  return {
    blocks: results,
    meta: {
      has_more: response.data.has_more,
      next_cursor: response.data.has_more ? response.data.next_cursor : '',
    },
  };
}

// const orderedList = {
//   type: 'orderedList',
//   attrs: {
//     order: 1,
//   },
//   content: [
//     {
//       type: 'listItem',
//       content: [
//         {
//           type: 'paragraph',
//           content: [
//             {
//               text: 'numbered list 1',
//               type: 'text',
//             },
//           ],
//         },
//         {
//           type: 'orderedList',
//           attrs: {
//             order: 1,
//           },
//           content: [
//             {
//               type: 'listItem',
//               content: [
//                 {
//                   type: 'paragraph',
//                   content: [
//                     {
//                       text: 'numbered list 1.1',
//                       type: 'text',
//                     },
//                   ],
//                 },
//               ],
//             },
//             {
//               type: 'listItem',
//               content: [
//                 {
//                   type: 'paragraph',
//                   content: [
//                     {
//                       text: 'numbered list 1.2',
//                       type: 'text',
//                     },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       type: 'listItem',
//       content: [
//         {
//           type: 'paragraph',
//           content: [
//             {
//               text: 'numbered list 2',
//               type: 'text',
//             },
//           ],
//         },
//       ],
//     },
//     {
//       type: 'listItem',
//       content: [
//         {
//           type: 'paragraph',
//           content: [
//             {
//               text: 'numbered list 3',
//               type: 'text',
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

// const image = {
//   type: 'mediaSingle',
//   attrs: {
//     layout: 'center',
//     width: 50.0,
//   },
//   content: [
//     {
//       type: 'media',
//       attrs: {
//         __fileSize: 89330,
//         __fileMimeType: 'image/png',
//         width: 335,
//         id: '2a0dbbad-dd0c-42a5-b775-42544a853882',
//         collection: 'contentId-621838349',
//         type: 'file',
//         __fileName: 'Screenshot 2023-07-21 at 12.36.18 AM.png',
//         height: 380,
//       },
//     },
//   ],
// };

// const video = {
//   type: 'mediaSingle',
//   attrs: {
//     layout: 'center',
//   },
//   content: [
//     {
//       type: 'media',
//       attrs: {
//         __fileMimeType: 'application/octet-stream',
//         width: 1920,
//         id: 'UNKNOWN_MEDIA_ID',
//         collection: '',
//         type: 'file',
//         height: 1080,
//       },
//     },
//   ],
// };

// const tableData = {
//   type: 'table',
//   attrs: {
//     layout: 'default',
//     localId: 'a12d2a24-b966-4247-a81b-b9b352086158',
//   },
//   content: [
//     {
//       type: 'tableRow',
//       content: [
//         {
//           type: 'tableHeader',
//           attrs: {
//             colspan: 1,
//             rowspan: 1,
//           },
//           content: [
//             {
//               type: 'paragraph',
//               content: [
//                 {
//                   text: 'col1row1',
//                   type: 'text',
//                   marks: [
//                     {
//                       type: 'strong',
//                     },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'tableHeader',
//           attrs: {
//             colspan: 1,
//             rowspan: 1,
//           },
//           content: [
//             {
//               type: 'paragraph',
//               content: [
//                 {
//                   text: 'col2row1',
//                   type: 'text',
//                   marks: [
//                     {
//                       type: 'strong',
//                     },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       type: 'tableRow',
//       content: [
//         {
//           type: 'tableCell',
//           attrs: {
//             colspan: 1,
//             rowspan: 1,
//           },
//           content: [
//             {
//               type: 'paragraph',
//               content: [
//                 {
//                   text: 'col1row2',
//                   type: 'text',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'tableCell',
//           attrs: {
//             colspan: 1,
//             rowspan: 1,
//           },
//           content: [
//             {
//               type: 'paragraph',
//               content: [
//                 {
//                   text: 'col2row2',
//                   type: 'text',
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

// export interface Content {
//   annotations: {
//     bold: string;
//     italic: string;
//     strikethrough: string;
//     underline: string;
//     code: string;
//     color: string;
//   };
//   plain_text: string;
//   href: string;
// }

// export interface Block {
//   id: string;
//   parent_id: string;
//   block_type: BlockType;
//   content: Content[];
//   children: Block[];
// }

export function getBlockData(data: any): Block[] {
  const type = confluenceType[data.type as keyof ConfluenceType];

  switch (type) {
    case BlockType.numbered_list_item:
    case BlockType.bulleted_list_item:
      return data.content.map((item: any) => {
        return {
          id: '',
          parent_id: '',
          block_type: type,
          content: item.content ? extractContent(item.content[0]) : [],
          children:
            item.content
              ?.slice(1)
              ?.map((item: any) => getBlockData(item))
              .flat() || [],
        };
      });

    case BlockType.table:
      return [
        {
          id: '',
          parent_id: '',
          block_type: type,
          content: [],
          children:
            data.content?.flatMap(
              (item: any) =>
                item.content?.map((tableContent: any) => getBlockData(tableContent)) || [],
            ) || [],
        },
      ];

    case BlockType.toggle:
      return [
        {
          id: '',
          parent_id: '',
          block_type: type,
          content: extractContent(data),
          children: data.content?.map((item: any) => getBlockData(item)).flat() || [],
        },
      ];

    default:
      console.log(data);
      const content = extractContent(data);

      return [
        {
          id: '',
          parent_id: '',
          block_type: data.type,
          content,
          children: [],
        },
      ];
  }
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
                return {
                  href: dataContent.attrs.url,
                };

              default:
                return [];
            }
          })
        : [];

    case BlockType.block_card:
      return [
        {
          href: data.attrs.href,
        },
      ] as Content[];

    case BlockType.file:
      return 'content' in data
        ? data.content?.map((media: any) => {
            return { plain_text: media.attrs.__fileName } as Content;
          })
        : [];

    case BlockType.toggle:
      return [
        {
          plain_text: data.attrs.title,
        } as Content,
      ];

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

export function extractChildrenData(data: SingleBlockResponse): Block[] {
  if (data.type === BlockType.table_row) {
    const cells = data[data.type].cells ? data[data.type].cells : [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return cells.map((cell: any) => ({
      id: data.id,
      parent_id: data.parent?.type ? data.parent[data.parent.type] : '',
      block_type: BlockType.table_cell,
      content: [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...cell?.map((richtext: any) => ({
          annotations: {
            bold: richtext.annotations.bold ?? '',
            italic: richtext.annotations.italic ?? '',
            strikethrough: richtext.annotations.strikethrough ?? '',
            underline: richtext.annotations.underline ?? '',
            code: richtext.annotations.code ?? '',
            color: richtext.annotations.color ?? '',
          },
          plain_text: richtext.plain_text,
          href: richtext.href,
        })),
      ],
      children: [],
    })) as Block[];
  }

  const caption = data[data.type].caption ? data[data.type].caption : [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return caption.map((richtext: any) => ({
    id: data.id,
    parent_id: data.parent?.type ? data.parent[data.parent.type] : '',
    block_type: BlockType.bookmark_text,
    content: [
      {
        annotations: {
          bold: richtext.annotations.bold ?? '',
          italic: richtext.annotations.italic ?? '',
          strikethrough: richtext.annotations.strikethrough ?? '',
          underline: richtext.annotations.underline ?? '',
          code: richtext.annotations.code ?? '',
          color: richtext.annotations.color ?? '',
        },
        plain_text: richtext.plain_text,
        href: richtext.href,
      },
    ],
    children: [],
  }));
}

export function extractBlockData(data: SingleBlockResponse): Block {
  const content = extractContent(data);

  let children: Block[] = [];

  if (data.type === BlockType.table_row || data.type === BlockType.bookmark) {
    children = extractChildrenData(data);
  } else {
    children = data.children
      ? data.children?.map((data: SingleBlockResponse) => extractBlockData(data))
      : [];
  }

  const block_data = {
    id: data.id,
    parent_id: data.parent?.type ? data.parent[data.parent.type] : '',
    block_type: data.type,
    content,
    children,
  };

  return block_data;
}
