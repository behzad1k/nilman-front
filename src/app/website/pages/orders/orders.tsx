import OrderCard from './orderCard.tsx';
import Cart from './cart.tsx';
import {IService} from '../../../../services/types.ts';
import {Typography, Box, Container} from '@mui/material';

export default function Orders() {
  // const service: IService = {
  //   title: 'ناخن',
  //   address: 'فرمانیه',
  //   date: '۱۴۰۲/۰۵/۰۱',
  //   details: ['لاک ژل'],
  //   discount: 40000,
  //   price: 400000,
  //   employee: {
  //     name: 'آیدا شهابی',
  //     username: 'aida',
  //     email: 'aida@gmail.com',
  //     imageUrl: '/img/girl.png',
  //   },
  // };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        alignItems: 'center',
      }}
    >
      <Container sx={{px: '24px', display: 'flex', flexDirection: 'column', gap: 5}}>
        <Cart />
        <Box component="section" sx={{display: 'flex', flexDirection: 'column', gap: 4}}>
          <Typography variant="h5" component="h1">
            سفارش های جدید
          </Typography>
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </Box>
        <Box component="section" sx={{display: 'flex', flexDirection: 'column', gap: 4}}>
          <Typography variant="h5" component="h1">
            سفارش ها پیشین
          </Typography>
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </Box>
      </Container>
    </Box>
  );
}
