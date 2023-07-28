/** Copyright (c) 2023, Poozle, all rights reserved. **/
import { Group, Table as MTable, TableProps, Text } from '@mantine/core';

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
  onRowClick?: (id: string) => void;
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
      className={onRowClick ? styles.dataRowClickable : ''}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick={() => onRowClick && onRowClick((element as any)[idKey])}
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

      {rows.length > 0 && <tbody>{rows}</tbody>}

      {rows.length === 0 && (
        <tbody>
          <Group p="md">No data found</Group>
        </tbody>
      )}
    </MTable>
  );
}
