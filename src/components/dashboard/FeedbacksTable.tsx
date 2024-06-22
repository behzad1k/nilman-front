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

import {IOrder, IService} from '../../services/types';
import moment from 'jalali-moment';
import {formatPrice} from '../../utils/utils';

interface Column {
  id:
    | 'rating'
    | 'createdAt'
    | 'description'
    | 'worker'
    | 'order'
    | 'user';
  label: string;
  secId?: string;
  thirdId?: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
}

const columns: readonly Column[] = [
  {id: 'createdAt', label: 'تاریخ', minWidth: 120, align: 'center'},
  {id: 'order', secId: 'user',thirdId: 'name', label: 'مشتری', minWidth: 150, align: 'center'},
  {id: 'order', secId: 'worker',thirdId: 'name', label: 'آرایشگر', minWidth: 150, align: 'center'},
  {id: 'rating', label: 'ستاره ها', minWidth: 80, align: 'center'},
  {id: 'description', label: 'توضیحات', minWidth: 80, align: 'center'},
  {id: 'order', secId: 'code', label: 'شماره سفارش', minWidth: 80, align: 'center'},
];

type Props = {
  rows: IOrder[];
  setOpenModal: (val: boolean) => void;
  setEditData: (val: IOrder) => void;
};

export function FeedbacksTable({rows, setOpenModal, setEditData}: Props) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
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
                      let value = row[column.id]
                      if (column.secId){
                        value = value[column.secId]
                        if(column.thirdId){
                          value = value[column.thirdId]
                        }
                      }

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value || '-'}
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
        component="div"
        sx={{display: 'flex', justifyContent: 'center'}}
      />
    </>
  );
}
