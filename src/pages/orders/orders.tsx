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
        paddingTop: '90px',
        alignItems: 'center',
      }}
    >
      <Container sx={{
        px: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 5
      }}>
          <Typography variant="h5" component="h3">سبد خرید</Typography>
          <Cart/>
      </Container>
    </Box>
  );
}
