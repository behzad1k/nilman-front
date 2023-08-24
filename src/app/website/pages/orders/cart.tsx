import {Box, Typography, Button} from '@mui/material';
import {X} from '@phosphor-icons/react';
import { ReactElement } from "react";
import { IOrder } from "../../../../services/types.ts";
import {formatPrice} from '../../../../utils/utils';
import {
  AppDispatch,
  useAppDispatch,
  useAppSelector,
} from '../../../../services/redux/store.ts';

interface ICartItemProps{
  item: IOrder
}
const CartItem = ({item}: ICartItemProps) => {

  return (
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
      <Typography> {item.service?.title} ، {item.attribute?.title}</Typography>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography
          variant="caption"
          sx={{textDecoration: 'line-through', color: 'crimson'}}
        >
          {item.discount > 0 && formatPrice(item.discount)}
        </Typography>
        <Typography variant="subtitle2">{formatPrice(item.price)}</Typography>
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
  )
}

export default function Cart() {
  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);

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
        {cartItems.map((value: IOrder, index) =>
          <CartItem item={value} key={index}/>
        )}
        <Button variant="contained">پرداخت</Button>
      </Box>
    </Box>
  );
}
