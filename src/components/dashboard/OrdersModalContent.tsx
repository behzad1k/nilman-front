import {SelectInput} from '../common/selectInput';
import {useEffect, useState} from 'react';
import {Box, Button, Typography} from '@mui/material';
import {api} from '../../services/http';
import {urls} from '../../services/endPoint';
import {useForm} from 'react-hook-form';
import {IOrder, IUser} from 'src/types/globalType.ts';
import {MenuItem} from '@mui/material';

type Props = {
  editData: IOrder | null;
  setEditData: (val: IOrder | null) => void;
  setOpenModal: (val: boolean) => void;
  fetchOrders: () => void;
};

export function OrdersModalContent({
  editData,
  setEditData,
  setOpenModal,
  fetchOrders,
}: Props) {
  const [workers, setWorkers] = useState([]);
  const {reset, handleSubmit, control} = useForm({
    values: editData || undefined,
  });

  const handleCloseEditModal = () => {
    setOpenModal(false);
    setEditData(null);
    reset();
  };

  const handleSubmitEditOrder = async (data: any) => {
    const reqOptions = {
      method: 'put',
      body: {
        orderId: data.id,
        workerId: data.workerId,
      },
    };
    const res = await api(urls.adminOrderUpdate, reqOptions, true);
    if (res.code === 200) {
      handleCloseEditModal();
      fetchOrders();
    }
  };
  useEffect(() => {
    const getWorkersList = async () => {
      if (!editData?.service) return;
      const params = new URLSearchParams({
        type: 'worker',
      });
      const res = await api(urls.adminUser + '?' + params, {}, true);
      if (res.code === 200) {
        setWorkers(res.data);
      }
    };
    getWorkersList();
  }, []);

  return (
    <>
      <Typography variant="h6" component="h2" marginBottom={6}>
        مدیریت سفارش
      </Typography>
      <Box
        component="form"
        sx={{display: 'flex', flexDirection: 'column', gap: 8}}
        onSubmit={handleSubmit(handleSubmitEditOrder)}
      >
        <SelectInput
          name="workerId"
          label="محول کردن به"
          control={control}
          defaultValue=""
          size="medium"
        >
          {workers.map((worker: IUser) => (
            <MenuItem key={worker.id} value={worker.id}>
              {worker.name} {worker.lastName}
            </MenuItem>
          ))}
        </SelectInput>
        <Box display="flex" flexDirection="column" gap={1}>
          <Button
            variant="contained"
            color="success"
            type="submit"
            size="large"
            fullWidth
          >
            ثبت
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleCloseEditModal}
            size="large"
            fullWidth
          >
            بیخیال
          </Button>
        </Box>
      </Box>
    </>
  );
}
