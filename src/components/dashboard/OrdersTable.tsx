import {useState} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from '@mui/material';

import {IOrder} from '../../services/types';
// @ts-ignore
import moment from 'moment-jalali';

interface Column {
  id:
    | 'price'
    | 'date'
    | 'time'
    | 'discount'
    | 'transportation'
    | 'status'
    | 'worker'
    | 'service'
    | 'attribute';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
}

const columns: readonly Column[] = [
  {id: 'date', label: 'تاریخ', minWidth: 120, align: 'center'},
  {id: 'time', label: 'زمان', minWidth: 80, align: 'center'},
  {id: 'service', label: 'خدمات', minWidth: 150, align: 'center'},
  {id: 'attribute', label: 'زیر دسته', minWidth: 150, align: 'center'},
  {id: 'status', label: 'وضعیت', minWidth: 120, align: 'center'},
  {id: 'worker', label: 'آرایشگر', minWidth: 150, align: 'center'},
  {id: 'price', label: 'قیمت', minWidth: 100, align: 'center'},
  {id: 'discount', label: 'تخفیف', minWidth: 80, align: 'center'},
  {id: 'transportation', label: 'ایاب ذهاب', minWidth: 120, align: 'center'},
];

type Props = {
  rows: IOrder[];
  setOpenModal: (val: boolean) => void;
  setEditData: (val: IOrder) => void;
};

export function OrdersTable({rows, setOpenModal, setEditData}: Props) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleOpenEditModal = (data: IOrder) => {
    setOpenModal(true);
    setEditData(data);
  };

  const formatOrderData = (type: string, value: any) => {
    switch (type) {
      case 'address':
        return value.description;
      case 'attribute':
        return value.title;
      case 'date':
        return moment.unix(value).format('jMM/jDD/jYYYY');
      case 'service':
        return value.title;
      case 'time':
        return value.split('_').join(' - ');
      case 'worker':
        console.log(value);
        return `${value.name} ${value.lastName}`;
      default:
        return value;
    }
  };

  return (
    <>
      <TableContainer sx={{maxHeight: '60vh'}}>
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
              <TableCell></TableCell>
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
                          {value ? formatOrderData(column.id, value) : '-'}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <Button
                        onClick={() => handleOpenEditModal(row)}
                        variant="contained"
                        color="primary"
                      >
                        مدیریت
                      </Button>
                    </TableCell>
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
        component="div"
        sx={{display: 'flex', justifyContent: 'center'}}
      />
    </>
  );
}
