import OrderCard from './orderCard.tsx';
import Cart from './cart.tsx';
import {IOrder, IService} from '../../../../services/types.ts';
import {Typography, Box, Container} from '@mui/material';
import {useAppSelector} from '../../../../services/redux/store.ts';
import emptyList from '../../../../assets/img/svg/emptylist.svg';

export default function Orders() {
  const orders = useAppSelector((state) => state.orderReducer.orders);
  const userData = useAppSelector((state) => state.userReducer.data);
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
        {userData?.role == 'USER' && (
          <>
            <Typography variant="h5" component="h1">
              سبد خرید
            </Typography>
            <Cart />
          </>
        )}
        <Box component="section" sx={{display: 'flex', flexDirection: 'column', gap: 4}}>
          <Typography variant="h5" component="h1">
            سفارش ها
          </Typography>
          {orders.length > 0 ? (
            <>
              {orders.map((value: IOrder, index) => (
                <OrderCard item={value} key={index} />
              ))}
            </>
          ) : (
            <>
              <Box
                component="img"
                src={emptyList as any}
                width="40%"
                mx="auto"
                maxWidth={160}
              />
              <Typography variant="body1" component="p" textAlign="center" mt={2}>
                سفارشی وجود ندارد
              </Typography>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
}
