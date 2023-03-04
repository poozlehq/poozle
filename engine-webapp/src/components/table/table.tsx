/** Copyright (c) 2023, Poozle, all rights reserved. **/
import { Table as MTable, TableProps, Text } from '@mantine/core';

import styles from './table.module.scss';

interface ColumnProps {
  key: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?(data: any): React.ReactElement;
}

interface CustomTableProps extends TableProps {
  columns: ColumnProps[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  idKey: string;
  onRowClick: (id: string) => void;
}

export function Table<TableDataType>({
  columns,
  data,
  idKey,
  onRowClick,
  ...restProps
}: CustomTableProps) {
  const rows = data.map((element: TableDataType) => (
    <tr
      className={styles.dataRow}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick={() => onRowClick((element as any)[idKey])}
    >
      {columns.map((column) => (
        <td>{column.render(element)}</td>
      ))}
    </tr>
  ));

  return (
    <MTable {...restProps}>
      <thead className={styles.headContainer}>
        <tr className={styles.headingRow}>
          {columns.map((column) => (
            <th key={column.key} className={styles.heading}>
              <Text size="xs" className={styles.headTitle}>
                {column.name}
              </Text>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>{rows}</tbody>
    </MTable>
  );
}
