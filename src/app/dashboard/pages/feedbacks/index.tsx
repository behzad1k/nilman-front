import {useState, useEffect} from 'react';
import {Modal} from '../../../../components';
import {OrdersTable} from '../../../../components';
import {OrdersModalContent} from '../../../../components';
import {Typography, Paper, Tab, Tabs} from '@mui/material';
import {useForm} from 'react-hook-form';
import { FeedbacksTable } from '../../../../components/dashboard/FeedbacksTable';
import {api} from '../../../../services/http';
import {urls} from '../../../../services/endPoint';
import {IOrder} from '../../../../services/types';
import {useCallback} from 'react';

type ShowType = 'ALL' | 'CREATED' | 'PAID' | 'ASSIGNED' | 'DONE' | 'CANCELED';

export default function Feedbacks() {
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<IOrder | null>(null);
  const [showType, setShowType] = useState<ShowType>('ALL');
  const [orders, setOrders] = useState<IOrder[] | null>(null);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const fetchFeedbacks = useCallback(async () => {
    const res = await api(urls.adminFeedback, {}, true);
    setOrders(res.data);
  }, []);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  if (orders) {
    return (
      <>
        <Typography variant="h5" component="h1">
          نظرسنجی ها
        </Typography>
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
          <FeedbacksTable
            rows={orders}
            setOpenModal={setOpenModal}
            setEditData={setEditData}
          />
        </Paper>
        <Modal open={openModal} setOpen={setOpenModal}>
          <OrdersModalContent
            editData={editData}
            setEditData={setEditData}
            setOpenModal={setOpenModal}
            fetchOrders={fetchFeedbacks}
          />
        </Modal>
      </>
    );
  } else return null;
}
