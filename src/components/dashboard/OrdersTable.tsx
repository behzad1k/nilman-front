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
    | 'price'
    | 'date'
    | 'time'
    | 'discount'
    | 'status'
    | 'worker'
    | 'service'
    | 'attributes';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
}

const columns: readonly Column[] = [
  {id: 'date', label: 'تاریخ', minWidth: 120, align: 'center'},
  {id: 'time', label: 'زمان', minWidth: 80, align: 'center'},
  {id: 'service', label: 'خدمات', minWidth: 150, align: 'center'},
  {id: 'attributes', label: 'زیر دسته', minWidth: 150, align: 'center'},
  {id: 'status', label: 'وضعیت', minWidth: 120, align: 'center'},
  {id: 'worker', label: 'آرایشگر', minWidth: 150, align: 'center'},
  {id: 'price', label: 'قیمت', minWidth: 100, align: 'center'},
  {id: 'discount', label: 'تخفیف', minWidth: 80, align: 'center'},
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

  const handleCopyRow = (row: IOrder) => {
    const attributes = row.attributes.reduce((acc, attr, index) => {
      if (index === row.attributes.length - 1) return (acc += attr.title);
      else return (acc += attr.title + ', ');
    }, '');

    const information = `
    تاریخ: ${moment.unix(Number(row.date)).format('jDD/jMM/jYYYY')}
    زمان: ${row.fromTime} تا ${row.toTime}
    خدمات: ${row.service.title} - ${attributes}
    آرایشگر: ${row.worker.name} ${row.worker.lastName} - ${row.worker.phoneNumber}
    هزینه: ${row.price}
    `;

    navigator.clipboard.writeText(information);
  };

  const formatOrderData = (type: string, value: any) => {
    const parsAttr = (attributes: IService[]) => {
      console.log('ATTTTTTR:', attributes);

      return attributes.reduce((acc, attribute, index) => {
        if (index !== attributes.length - 1) {
          return (acc += attribute.title + '، ');
        } else {
          return (acc += attribute.title);
        }
      }, '');
    };

    switch (type) {
      case 'address':
        return value.description;
      case 'attributes':
        console.log(parsAttr(value));

        return parsAttr(value);
      case 'date':
        return moment.unix(value).format('jDD/jMM/jYYYY');
      case 'service':
        return value.title;
      case 'time':
        return value.split('_').join(' - ');
      case 'worker':
        return `${value.name} ${value.lastName}`;
      case 'price':
        return formatPrice(value);
      case 'status':
        return value.toLocaleUpperCase() === 'CREATED'
          ? 'در سبد خرید'
          : value.toLocaleUpperCase() === 'PAID'
          ? 'پرداخت شده'
          : value.toLocaleUpperCase() === 'ASSIGNED'
          ? 'محول شده'
          : value.toLocaleUpperCase() === 'DONE'
          ? 'انجام شده'
          : value.toLocaleUpperCase() === 'CANCELED'
          ? 'لغو شده'
          : value.toLocaleUpperCase() === 'ACCEPTED'
          ? 'تایید شده توسط آرایشگر'
          : 'unknown';
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
                    <TableCell>
                      <Button
                        onClick={() => handleCopyRow(row)}
                        variant="contained"
                        color="primary"
                      >
                        کپی
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
