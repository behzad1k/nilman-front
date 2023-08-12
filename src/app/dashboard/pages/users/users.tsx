import {useState} from 'react';

import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Box,
} from '@mui/material';

interface Column {
  id: 'fullName' | 'phoneNumber' | 'ordersCount';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {id: 'fullName', label: 'نام‌ و نام خانوادگی', minWidth: 170},
  {id: 'phoneNumber', label: 'تلفن همراه', minWidth: 100},
  {
    id: 'ordersCount',
    label: 'تعداد سفارشات',
    minWidth: 170,
  },
];

interface Data {
  fullName: string;
  phoneNumber: string;
  ordersCount: number;
}

function createData(fullName: string, phoneNumber: string, ordersCount: number): Data {
  return {fullName, phoneNumber, ordersCount};
}

const rows = [
  createData('بهزاد کوهیانی', '09037101006', 4),
  createData('مریم حیدری', '09918491212', 13),
  createData('قاسم عباسی', '09122265115', 31),
  createData('آوا صیدی زاده', '09107315462', 1),
  createData('بهزاد کوهیانی', '09037101006', 4),
  createData('مریم حیدری', '09918491212', 13),
  createData('قاسم عباسی', '09122265115', 31),
  createData('آوا صیدی زاده', '09107315462', 1),
  createData('بهزاد کوهیانی', '09037101006', 4),
  createData('مریم حیدری', '09918491212', 13),
  createData('قاسم عباسی', '09122265115', 31),
  createData('آوا صیدی زاده', '09107315462', 1),
  createData('بهزاد کوهیانی', '09037101006', 4),
  createData('مریم حیدری', '09918491212', 13),
  createData('قاسم عباسی', '09122265115', 31),
  createData('آوا صیدی زاده', '09107315462', 1),
  createData('بهزاد کوهیانی', '09037101006', 4),
  createData('مریم حیدری', '09918491212', 13),
  createData('قاسم عباسی', '09122265115', 31),
  createData('آوا صیدی زاده', '09107315462', 1),
  createData('بهزاد کوهیانی', '09037101006', 4),
  createData('مریم حیدری', '09918491212', 13),
  createData('قاسم عباسی', '09122265115', 31),
  createData('آوا صیدی زاده', '09107315462', 1),
];

export default function Users() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  return (
    <Box
      component="main"
      paddingY={3}
      paddingX={1.5}
      display="flex"
      flexDirection="column"
      gap={3}
    >
      <Typography variant="h5" component="h1">
        لیست کاربران
      </Typography>
      <Paper sx={{width: '100%', overflow: 'hidden'}}>
        <TableContainer sx={{maxHeight: 440}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{minWidth: column.minWidth}}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          colSpan={3}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              'aria-label': 'rows per page',
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          labelDisplayedRows={({from, to}) => `از ${from} تا ${to}`}
        />
      </Paper>
    </Box>
  );
}
