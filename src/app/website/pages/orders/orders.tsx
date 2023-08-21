import OrderRow from './orderRow.tsx';
import OrderRowWorker from './orderRowWorker.tsx';
import {IService} from '../../../../services/types.ts';
import {Typography, Container} from '@mui/material';
export default function Orders() {
  const userType: string = 'worker';
  const service: IService = {
    title: 'ناخن',
    address: 'فرمانیه',
    date: '۱۴۰۲/۰۵/۰۱',
    details: ['لاک ژل'],
    discount: 40000,
    price: 400000,
    employee: {
      name: 'آیدا شهابی',
      username: 'aida',
      email: 'aida@gmail.com',
      imageUrl: '/img/girl.png',
    },
  };
  return (
    <main className="ordersMain">
      <section className="ordersContainer">
        {userType === 'worker' && (
          <>
            <Typography variant="h5" component="h1">
              سفارش های جدید
            </Typography>
            <OrderRowWorker />
            <OrderRowWorker />
            <OrderRowWorker />
          </>
        )}
        <Typography variant="h5" component="h1">
          سفارش ها
        </Typography>
        <OrderRow service={service} />
        <OrderRow service={service} />
      </section>
    </main>
  );
}
