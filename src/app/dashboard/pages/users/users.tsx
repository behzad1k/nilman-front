import {useState, useEffect} from 'react';
import {Modal} from '../../../../components';
import {TextInput, SelectInput} from '../../../../components';
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
import {api} from '../../../../services/http';
import {urls} from '../../../../services/endPoint';

interface Column {
  id: 'name' | 'lastName' | 'nationalCode' | 'phoneNumber' | 'addresses';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {id: 'name', label: 'نام‌ ', minWidth: 170, align: 'center'},
  {id: 'lastName', label: 'نام خانوادگی ', minWidth: 170, align: 'center'},
  {id: 'nationalCode', label: 'کدملی', minWidth: 170, align: 'center'},
  {id: 'phoneNumber', label: 'تلفن همراه', minWidth: 100, align: 'center'},
  {id: 'addresses', label: 'آدرس', minWidth: 250, align: 'center'},
];

interface Data {
  id: number;
  name: string;
  lastName: string;
  nationalCode: string;
  phoneNumber: string;
  role: string;
  addresses: [];
  orders: [];
}

export default function Users() {
  const [page, setPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editData, setEditData] = useState<null | Data>(null);
  const [deleteData, setDeleteData] = useState<null | Data>(null);
  const [users, setUsers] = useState<Data[]>([]);
  const rowsPerPage = 10;

  const roleOptions = [
    {
      slug: 'USER',
      value: 'USER',
    },
    {
      slug: 'WORKER',
      value: 'WORKER',
    },
    {
      slug: 'OPERATOR',
      value: 'OPERATOR',
    },
    {
      slug: 'SUPER_ADMIN',
      value: 'SUPER_ADMIN',
    },
  ];

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

  const handleOpenDeleteModal = (data: Data) => {
    setOpenDeleteModal(true);
    setDeleteData(data);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setDeleteData(null);
  };

  const handleSubmitEditUser = async (data: Data) => {
    if (!editData) return;
    const reqOptions = {
      method: 'put',
      body: {...editData, ...data, userId: editData.id},
    };
    const res = await api(urls.updateUser, reqOptions, true);
    console.log(res);
    if (res.code === 200) {
      setUsers((prev) => prev.map((user) => (user.id === editData.id ? res.data : user)));
      handleCloseEditModal();
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteData) return;
    const reqOptions = {
      method: 'delete',
      body: {userId: deleteData.id},
    };
    const res = await api(urls.deleteUser, reqOptions, true);
    console.log(res);
    if (res.code === 204) {
      setUsers((prev) => prev.filter((user) => user.id !== deleteData.id));
      handleCloseDeleteModal();
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api(urls.getUsers, {}, true);
      console.log(res);
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

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
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, i) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                      {columns.map((column) => {
                        const value = user[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value.length ? value : '-'}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <Button
                          onClick={() => handleOpenEditModal(user)}
                          variant="contained"
                          color="primary"
                        >
                          ویرایش
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleOpenDeleteModal(user)}
                          variant="contained"
                          color="error"
                        >
                          حذف
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
          count={users.length}
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
            label="نام"
            name="name"
            control={control}
            defaultValue={editData?.name || ''}
          />
          <TextInput
            label="نام خانوادگی"
            name="lastName"
            control={control}
            defaultValue={editData?.lastName || ''}
          />
          <TextInput
            label="شماره ملی"
            name="nationalCode"
            control={control}
            defaultValue={editData?.nationalCode || ''}
          />
          <TextInput
            label="تلفن همراه"
            name="phoneNumber"
            control={control}
            defaultValue={editData?.phoneNumber || ''}
          />
          <SelectInput
            name="role"
            label="نقش"
            defaultValue={editData?.role || ''}
            options={roleOptions}
            control={control}
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
      <Modal open={openDeleteModal} setOpen={setOpenDeleteModal}>
        <Typography variant="h6" component="h2" marginBottom={4}>
          آیا از حذف کاربر اطمینان دارید ؟
        </Typography>
        <Box display="flex" flexDirection="column" gap={1}>
          <Button variant="contained" color="error" fullWidth onClick={handleDeleteUser}>
            حذف
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleCloseDeleteModal}
            fullWidth
          >
            بیخیال
          </Button>
        </Box>
      </Modal>
    </>
  );
}
