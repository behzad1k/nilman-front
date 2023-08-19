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

interface Column {
  id:
    | 'registrationDate'
    | 'requestedService'
    | 'fullName'
    | 'phoneNumber'
    | 'executionDate'
    | 'executionTime'
    | 'address'
    | 'status'
    | 'handler';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
}

interface Data {
  registrationDate: string;
  requestedService: string;
  fullName: string;
  phoneNumber: string;
  executionDate: string;
  executionTime: string;
  address: string;
  status: string;
  handler: string;
}

const columns: readonly Column[] = [
  {id: 'registrationDate', label: 'تاریخ درخواست', minWidth: 150, align: 'center'},
  {id: 'requestedService', label: 'سرویس درخواستی', minWidth: 150, align: 'center'},
  {id: 'fullName', label: 'نام‌ و نام خانوادگی', minWidth: 170, align: 'center'},
  {id: 'phoneNumber', label: 'تلفن همراه', minWidth: 100, align: 'center'},
  {id: 'executionDate', label: 'تاریخ انجام', minWidth: 150, align: 'center'},
  {id: 'executionTime', label: 'زمان انجام', minWidth: 150, align: 'center'},
  {id: 'address', label: 'آدرس', minWidth: 250, align: 'center'},
  {id: 'status', label: 'وضعیت', minWidth: 150, align: 'center'},
  {id: 'handler', label: 'اجرا کننده', minWidth: 200, align: 'center'},
];

type Props = {
  rows: Data[];
  setOpenModal: (val: boolean) => void;
  setEditData: (val: Data) => void;
};

export function OrdersTable({rows, setOpenModal, setEditData}: Props) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleOpenEditModal = (data: Data) => {
    setOpenModal(true);
    setEditData(data);
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
                          {value}
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
