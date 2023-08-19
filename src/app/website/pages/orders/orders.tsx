import OrderRow from './orderRow.tsx';
import {IService} from '../../../../services/types.ts';
export default function Orders() {
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
      email: 'aida@gmail.co m',
      imageUrl: '/img/girl.png',
    },
  };
  return (
    <main className="ordersMain">
      <section className="ordersContainer">
        <h2>سفارش ها</h2>
        <OrderRow service={service} />
        <OrderRow service={service} />
      </section>
    </main>
  );
}
