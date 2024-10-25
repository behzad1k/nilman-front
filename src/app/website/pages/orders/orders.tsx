import OrderCard from './orderCard';
import Cart from './cart';
import {IOrder, IService} from '../../../../services/types';
import {Typography, Box, Container, Tabs, Tab} from '@mui/material';
import {useAppSelector} from '../../../../services/redux/store';
import emptyList from '../../../../assets/img/svg/emptylist.svg';
import {useState} from 'react';

type ShowType = 'current' | 'previous';

export default function Orders() {
  const [value, setValue] = useState(0);
  const [showType, setShowType] = useState<ShowType>('current');
  const orders = [...useAppSelector((state) => state.orderReducer.orders)];
  const userData = useAppSelector((state) => state.userReducer.data);
  const currentOrders: IOrder[] = [];
  const prevOrders: IOrder[] = [];

  orders.map((order) => {
    if (order.status !== 'Done') {
      currentOrders.push(order);
    } else {
      prevOrders.push(order);
    }
  });

  // if (showType === 'current') {
  //   // FILTER HERE
  // }

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
      <Container sx={{px: '24px', display: 'flex', flexDirection: 'column', gap: 5}}>
          <>
            <Typography variant="h5" component="h1">لیست سفارشات</Typography>
            <Cart />
          </>
        <Box component="section" sx={{display: 'flex', flexDirection: 'column', gap: 4}}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            variant="fullWidth"
            sx={{
              '& .Mui-selected': {backgroundColor: 'var(--light-pink)'},
            }}
          >
            <Tab
              onClick={() => setShowType('current')}
              label="سفارش های جاری"
              sx={{fontSize: 16}}
            />
            <Tab
              onClick={() => setShowType('previous')}
              label="سفارش های پیشین"
              sx={{fontSize: 16}}
            />
          </Tabs>
          {showType === 'current' ? (
            currentOrders.length > 0 ? (
              <>
                {currentOrders.reverse().map((value: IOrder, index) => (
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
            )
          ) : prevOrders.length > 0 ? (
            <>
              {prevOrders.reverse().map((value: IOrder, index) => (
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
