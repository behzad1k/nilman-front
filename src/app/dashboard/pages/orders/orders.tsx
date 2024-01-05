import {useState, useEffect} from 'react';
import {Modal} from '../../../../components';
import {OrdersTable} from '../../../../components';
import {OrdersModalContent} from '../../../../components';
import {Typography, Paper, Tab, Tabs} from '@mui/material';
import {useForm} from 'react-hook-form';
import {api} from '../../../../services/http';
import {urls} from '../../../../services/endPoint';
import {IOrder} from '../../../../services/types';
import {useCallback} from 'react';

type ShowType = 'ALL' | 'CREATED' | 'PAID' | 'ASSIGNED' | 'DONE' | 'CANCELED';

export default function Orders() {
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<IOrder | null>(null);
  const [showType, setShowType] = useState<ShowType>('ALL');
  const [orders, setOrders] = useState<IOrder[] | null>(null);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const fetchOrders = useCallback(async () => {
    const res = await api(urls.adminOrder, {}, true);
    setOrders(res.data);
    console.log('ORDERS:', res);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

  if (orders) {
    return (
      <>
        <Typography variant="h5" component="h1">
          سفارش ها
        </Typography>

        <Paper sx={{width: '100%', overflow: 'hidden'}}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              '& .Mui-selected': {backgroundColor: '#fff'},
            }}
          >
            <Tab onClick={() => setShowType('ALL')} label="همه" />
            <Tab onClick={() => setShowType('CREATED')} label="در سبد خرید" />
            <Tab onClick={() => setShowType('PAID')} label="پرداخت شده" />
            <Tab onClick={() => setShowType('ASSIGNED')} label="محول شده" />
            <Tab onClick={() => setShowType('DONE')} label="انجام شده" />
            <Tab onClick={() => setShowType('CANCELED')} label="لغو شده" />
          </Tabs>
          <OrdersTable
            rows={
              showType === 'ALL'
                ? orders
                : orders?.filter((order) => order.status.toLocaleUpperCase() === showType)
            }
            setOpenModal={setOpenModal}
            setEditData={setEditData}
          />
        </Paper>
        <Modal open={openModal} setOpen={setOpenModal}>
          <OrdersModalContent
            editData={editData}
            setEditData={setEditData}
            setOpenModal={setOpenModal}
            fetchOrders={fetchOrders}
          />
        </Modal>
      </>
    );
  } else return null;
}
