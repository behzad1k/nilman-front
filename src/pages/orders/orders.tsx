import { Box, Container, Typography } from '@mui/material';
import globalType from '../../types/globalType';
import emptyList from '../../assets/img/svg/emptylist.svg';
import { useAppSelector } from '../../services/redux/store';
import Cart from './cart';
import CartItem from './cartItem';
import OrderCard from './orderCard';

export default function Orders() {
  const orders = [...useAppSelector((state) => state.orderReducer.orders)];
  const currentOrders: globalType.Order[] = orders.filter(e => e.status != 'Canceled' && e.status != 'Done');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        paddingTop: '70px',
        alignItems: 'center',
      }}
    >
      <Container sx={{
        px: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 5
      }}>
        <>
          <Typography variant="h5" component="h1">لیست سفارشات</Typography>
          <Cart/>
        </>
        <Box component="section" sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4
        }}>
          {currentOrders.length > 0 ? (
              <>
                {currentOrders.reverse().map((value: globalType.Order, index) => (
                  <CartItem item={value} key={index}/>
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
                  سفارش فعالی وجود ندارد
                </Typography>
              </>
            )
          }
        </Box>
      </Container>
    </Box>
  );
}
