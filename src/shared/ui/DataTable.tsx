import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import type { ReactNode } from 'react';

export interface Column<T> {
  key: string;
  title: string;
  render: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export function DataTable<T>({ data, columns }: DataTableProps<T>) {
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
              <TableCell
                key={column.key}
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                }}
              >
                {column.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              hover
              sx={{
                '&:last-child td': { borderBottom: 0 },
              }}
            >
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