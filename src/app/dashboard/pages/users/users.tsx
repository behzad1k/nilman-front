import {useState} from 'react';

import {Modal} from '../../../../components';

import {TextInput} from '../../../../components';

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
  Button,
} from '@mui/material';

import {useForm} from 'react-hook-form';

interface Column {
  id: 'fullName' | 'phoneNumber' | 'ordersCount' | 'address';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {id: 'fullName', label: 'نام‌ و نام خانوادگی', minWidth: 170, align: 'center'},
  {id: 'phoneNumber', label: 'تلفن همراه', minWidth: 100, align: 'center'},
  {id: 'ordersCount', label: 'تعداد سفارشات', minWidth: 120, align: 'center'},
  {id: 'address', label: 'آدرس', minWidth: 250, align: 'center'},
];

interface Data {
  fullName: string;
  phoneNumber: string;
  ordersCount: number;
  address: string;
}

function createData(
  fullName: string,
  phoneNumber: string,
  ordersCount: number,
  address: string,
): Data {
  return {fullName, phoneNumber, ordersCount, address};
}

const rows = [
  createData('بهزاد کوهیانی', '09037101006', 4, 'خوزستان، اهواز، گستان، خیابان آذر'),
  createData('مریم حیدری', '09918491212', 13, 'تهران، خیابان شریعتی، پلاک ۱۲'),
  createData(
    'قاسم عباسی',
    '09122265115',
    31,
    'تهران، خیابان شریعتی، پایین تر از پل صدر، بن بست الهیه',
  ),
  createData('آوا صیدی زاده', '09107315462', 1, 'خوزستان، اهواز، گستان، خیابان آذر'),
  createData('بهزاد کوهیانی', '09037101006', 4, 'تهران، خیابان شریعتی، پلاک ۱۲'),
  createData(
    'مریم حیدری',
    '09918491212',
    13,
    'تهران، خیابان شریعتی، پایین تر از پل صدر، بن بست الهیه',
  ),
  createData('قاسم عباسی', '09122265115', 31, 'خوزستان، اهواز، گستان، خیابان آذر'),
  createData('آوا صیدی زاده', '09107315462', 1, 'تهران، خیابان شریعتی، پلاک ۱۲'),
  createData(
    'بهزاد کوهیانی',
    '09037101006',
    4,
    'تهران، خیابان شریعتی، پایین تر از پل صدر، بن بست الهیه',
  ),
  createData('مریم حیدری', '09918491212', 13, 'خوزستان، اهواز، گستان، خیابان آذر'),
  createData('قاسم عباسی', '09122265115', 31, 'تهران، خیابان شریعتی، پلاک ۱۲'),
  createData(
    'آوا صیدی زاده',
    '09107315462',
    1,
    'تهران، خیابان شریعتی، پایین تر از پل صدر، بن بست الهیه',
  ),
  createData('بهزاد کوهیانی', '09037101006', 4, 'خوزستان، اهواز، گستان، خیابان آذر'),
  createData('مریم حیدری', '09918491212', 13, 'تهران، خیابان شریعتی، پلاک ۱۲'),
  createData(
    'قاسم عباسی',
    '09122265115',
    31,
    'تهران، خیابان شریعتی، پایین تر از پل صدر، بن بست الهیه',
  ),
  createData('آوا صیدی زاده', '09107315462', 1, 'خوزستان، اهواز، گستان، خیابان آذر'),
  createData('بهزاد کوهیانی', '09037101006', 4, 'تهران، خیابان شریعتی، پلاک ۱۲'),
  createData(
    'مریم حیدری',
    '09918491212',
    13,
    'تهران، خیابان شریعتی، پایین تر از پل صدر، بن بست الهیه',
  ),
  createData('قاسم عباسی', '09122265115', 31, 'خوزستان، اهواز، گستان، خیابان آذر'),
  createData('آوا صیدی زاده', '09107315462', 1, 'تهران، خیابان شریعتی، پلاک ۱۲'),
  createData(
    'بهزاد کوهیانی',
    '09037101006',
    4,
    'تهران، خیابان شریعتی، پایین تر از پل صدر، بن بست الهیه',
  ),
  createData('مریم حیدری', '09918491212', 13, 'خوزستان، اهواز، گستان، خیابان آذر'),
  createData('قاسم عباسی', '09122265115', 31, 'تهران، خیابان شریعتی، پلاک ۱۲'),
  createData(
    'آوا صیدی زاده',
    '09107315462',
    1,
    'تهران، خیابان شریعتی، پایین تر از پل صدر، بن بست الهیه',
  ),
];

export default function Users() {
  const [page, setPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<null | Data>(null);
  const rowsPerPage = 10;

  const {reset, handleSubmit, control} = useForm({
    values: editData || undefined,
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleOpenEditModal = (data: Data) => {
    setOpenModal(true);
    setEditData(data);
  };

  const handleCloseEditModal = () => {
    setOpenModal(false);
    setEditData(null);
    reset();
  };

  const handleSubmitEditUser = (data: Data) => {
    console.log(data);
  };
  return (
    <>
      <Typography variant="h5" component="h1">
        لیست کاربران
      </Typography>
      <Paper sx={{width: '100%', overflow: 'hidden'}}>
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
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <Button
                          onClick={() => handleOpenEditModal(row)}
                          variant="contained"
                          color="primary"
                        >
                          ویرایش
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
      </Paper>

      <Modal open={openModal} setOpen={setOpenModal}>
        <Typography variant="h6" component="h2" marginBottom={4}>
          ویرایش کاربر
        </Typography>
        <Box
          component="form"
          sx={{display: 'flex', flexDirection: 'column', gap: 3}}
          onSubmit={handleSubmit(handleSubmitEditUser)}
        >
          <TextInput
            label="نام و نام‌خانوادگی"
            name="fullName"
            control={control}
            defaultValue={editData?.fullName || ''}
          />
          <TextInput
            label="تلفن همراه"
            name="phoneNumber"
            control={control}
            defaultValue={editData?.phoneNumber || ''}
          />
          <TextInput
            label="تعداد سفارشات"
            name="ordersCount"
            control={control}
            defaultValue={editData?.ordersCount || ''}
          />
          <TextInput
            label="آدرس"
            name="address"
            control={control}
            defaultValue={editData?.address || ''}
          />
          <Box display="flex" flexDirection="column" gap={1}>
            <Button variant="contained" color="success" type="submit" fullWidth>
              ویرایش
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCloseEditModal}
              fullWidth
            >
              بیخیال
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
