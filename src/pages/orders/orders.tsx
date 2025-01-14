import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import globalType from '../../types/globalType.ts';
import emptyList from '../../assets/img/svg/emptylist.svg';
import { useAppSelector } from '../../services/redux/store';
import Cart from './cart';
import OrderCard from './orderCard';

type ShowType = 'current' | 'previous';

export default function Orders() {
  const [value, setValue] = useState(0);
  const [showType, setShowType] = useState<ShowType>('current');
  const orders = [...useAppSelector((state) => state.orderReducer.orders)];
  const currentOrders: globalType.Order[] = [];
  const prevOrders: globalType.Order[] = [];

  orders.filter(e => e.status != 'Canceled').map((order) => {
    if (order.status !== 'Done') {
      currentOrders.push(order);
    } else {
      prevOrders.push(order);
    }
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            variant="fullWidth"
            sx={{
              '& .Mui-selected': { backgroundColor: 'var(--light-pink)' },
            }}
          >
            <Tab
              onClick={() => setShowType('current')}
              label="سفارش های جاری"
              sx={{ fontSize: 16 }}
            />
            <Tab
              onClick={() => setShowType('previous')}
              label="سفارش های پیشین"
              sx={{ fontSize: 16 }}
            />
          </Tabs>
          {showType === 'current' ? (
            currentOrders.length > 0 ? (
              <>
                {currentOrders.reverse().map((value: globalType.Order, index) => (
                  <OrderCard item={value} key={index}/>
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
            )
          ) : prevOrders.length > 0 ? (
            <>
              {prevOrders.reverse().map((value: globalType.Order, index) => (
                <OrderCard item={value} key={index}/>
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
