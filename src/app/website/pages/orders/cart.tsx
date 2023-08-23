import {Box, Typography, Button} from '@mui/material';
import {X} from '@phosphor-icons/react';
import {formatPrice} from '../../../../utils/utils';
import {
  AppDispatch,
  useAppDispatch,
  useAppSelector,
} from '../../../../services/redux/store.ts';
import {useEffect} from 'react';
import {cart} from '../../../../services/redux/reducers/cartSlice.ts';

function CartItem() {
  const dispatch: AppDispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);

  useEffect(() => {
    dispatch(cart());
  }, []);

  return cartItems.length ? (
    <Box
      component="article"
      sx={{
        bgcolor: 'var(--white-pink)',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        p: 1,
      }}
    >
      <Typography>ناخن، لاک ژل</Typography>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography
          variant="caption"
          sx={{textDecoration: 'line-through', color: 'crimson'}}
        >
          {formatPrice(2400000)}
        </Typography>
        <Typography variant="subtitle2">{formatPrice(2100000)}</Typography>
      </Box>
      <Box display="flex" gap={1}>
        <Button
          variant="outlined"
          sx={{
            flex: 1,
            borderColor: 'var(--dashboard-dark)',
            color: 'var(--light-black)',
          }}
        >
          جزئیات
        </Button>
        <Button
          variant="contained"
          sx={{bgcolor: 'var(--light-pink)', ':hover': {bgcolor: 'var(--mid-pink)'}}}
        >
          <X size={20} color="var(--light-black)" />
        </Button>
      </Box>
    </Box>
  ) : null;
}

export default function Cart() {
  return (
    <Box component="section" width="100%">
      <Typography variant="h5" component="h1" mb={4}>
        سبد خرید
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          bgcolor: 'var(--light-grey)',
          py: 1,
          px: 1,
          borderRadius: 1,
        }}
      >
        <CartItem />
        <CartItem />
        <CartItem />
        <Button variant="contained">پرداخت</Button>
      </Box>
    </Box>
  );
}
