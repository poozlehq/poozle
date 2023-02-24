/** Copyright (c) 2023, Poozle, all rights reserved. **/
import { Table as MTable, Text, createStyles } from '@mantine/core';

import styles from './table.module.scss';

interface ColumnProps {
  key: string;
  name: string;
  render?(): React.ReactElement;
}

interface TableProps {
  columns: ColumnProps[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

const useStyles = createStyles((theme) => ({
  head: {
    backgroundColor: theme.fn.variant({
      variant: 'light',
      color: theme.primaryColor,
    }).background,
  },
}));

export function Table({ columns }: TableProps) {
  const { classes } = useStyles();

  return (
    <MTable>
      <thead className={classes.head}>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>
              <Text size="xs" className={styles.headTitle}>
                {column.name}
              </Text>
            </th>
          ))}
        </tr>
      </thead>
    </MTable>
  );
}
