import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import type { ReactNode } from 'react';

export interface Column<T> {
  key: string;
  title: string;
  sortable?: boolean;
  render: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  order?: 'asc' | 'desc';
  orderBy?: string;
  onSort?: (key: string) => void;
}

export function DataTable<T>({
  data,
  columns,
  order,
  orderBy,
  onSort,
}: DataTableProps<T>) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: '#f8fafc' }}>
            {columns.map((column) => (
              <TableCell key={column.key}>
                {column.sortable ? (
                  <TableSortLabel
                    active={orderBy === column.key}
                    direction={orderBy === column.key ? order : 'asc'}
                    onClick={() => onSort?.(column.key)}
                  >
                    {column.title}
                  </TableSortLabel>
                ) : (
                  column.title
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} hover>
              {columns.map((column) => (
                <TableCell key={column.key}>{column.render(row)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}