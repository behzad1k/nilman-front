import OrderCard from './orderCard.tsx';
import Cart from './cart.tsx';
import { IOrder, IService } from '../../../../services/types.ts';
import {Typography, Box, Container} from '@mui/material';
import {
  useAppSelector,
} from '../../../../services/redux/store.ts';

export default function Orders() {
  const orders = useAppSelector(state => state.orderReducer.orders);
  const userData = useAppSelector(state => state.userReducer.data);
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
          <Typography variant="h5" component="h1">
            سبد خرید
          </Typography>
          {userData?.role == "USER" && <Cart />}
          <Box component="section" sx={{display: 'flex', flexDirection: 'column', gap: 4}}>
            <Typography variant="h5" component="h1">
              سفارش های پیشین
            </Typography>
            {orders.length ? orders.map((value: IOrder, index) => <OrderCard item={value} key={index}/>) : ''}

          </Box>
        </Container>

      </Box>

  );
}
