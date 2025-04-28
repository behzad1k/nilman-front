import { Box, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Switch from 'react-ios-switch';
import { toast } from 'react-toastify';
import PortalPickerDrawer from '../../components/drawers/PortalPickerDrawer';
import { useDrawer, useRegisterDrawerComponent } from '../../components/layers/Drawer/DrawerContext';
import { OrderStatus } from '../../enums/enums';
import { urls } from '../../services/endPoint';
import { api } from '../../services/http';
import { cart } from '../../services/redux/reducers/cartSlice';
import { SET_LOADING } from '../../services/redux/reducers/loadingSlice';
import { order } from '../../services/redux/reducers/orderSlice';
import { useAppDispatch, useAppSelector } from '../../services/redux/store';
import globalType from '../../types/globalType';
import { formatPrice } from '../../utils/utils';
import CartItem from './cartItem';
import OrderCard from './orderCard';

enum tabs {
  Created= 'Created',
  Done = 'Done',
  InProgress = 'InProgress'
}

const tabTitles = {
  Created: 'سبد خرید',
  InProgress: 'سفارشات جاری',
  Done: 'تمام شده',
}

const initCounts = {
  Created: 0,
  InProgress: 0,
  Done: 0
}

export default function Orders() {
  const cartReducer = useAppSelector((state) => state.cartReducer);
  const orders = useAppSelector(state => state.orderReducer.orders)
  const userReducer = useAppSelector((state) => state.userReducer);
  const finalPrice = cartReducer.cartItems.reduce((acc, curr) => acc + curr.finalPrice, 0);
  const [isCredit, setIsCredit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tab, setTab] = useState<string | null>(null);
  const [items, setItems] = useState<globalType.Order[]>([]);
  const [counts, setCounts] = useState(initCounts);
  const dispatch = useAppDispatch();

  useRegisterDrawerComponent('portalDrawer', PortalPickerDrawer)

  const { openDrawer } = useDrawer();


  const deleteCartItem = async (id: number) => {
    dispatch(SET_LOADING(true));
    const res = await api(
      urls.order,
      {
        method: 'DELETE',
        body: {
          orderId: id,
        },
      },
      true,
    );
    if (res.code == 200) {
      setSuccess(!success)
      dispatch(cart());
      dispatch(order())
      toast('سفارش با موفقیت از سبد خرید حذف شد', { type: 'success' });
    }
    dispatch(SET_LOADING(false));
  };

  const content = () => {
    if (items.length > 0){
      if (tab == tabs.Created){
        return(
          <>
            {items.map((order, index) => (
              <CartItem key={order.id} item={order} deleteCartItem={deleteCartItem}/>
            ))}
            <article className="cartItemContainer">
            <span className="orderInfo">
              <h3>فاکتور نهایی</h3>
            </span>
              <div className="orderInfo">
                <p>جمع کل </p>
                <span className="orderInfoDelete">
                <p>{formatPrice(cartReducer.cartItems.reduce((acc, curr) => acc + curr.finalPrice, 0))} تومان</p>
              </span>
              </div>
              <span className="orderInfo dashedBottom">
              <p>تخفیف</p>
              <span className="orderInfoDelete">
                <p>{formatPrice(cartReducer.cartItems.reduce((acc, curr) => acc + curr.discountAmount, 0))} تومان</p>
              </span>
            </span>
              <span className="orderInfo">
              <h4>مبلغ قابل پرداخت</h4>
              <h4> {formatPrice(cartReducer.cartItems.reduce((acc, curr) => acc + curr.finalPrice, 0) - (isCredit ? userReducer.data?.walletBalance : 0) < 0 ? 0 : (cartReducer.cartItems.reduce((acc, curr) => acc + curr.finalPrice, 0) - (isCredit ? userReducer.data?.walletBalance : 0)))} تومان</h4>
            </span>
            </article>
            {userReducer?.data?.walletBalance > 0 && (
              <div className="cartIsCredit">
                <span>استفاده از کیف پول {formatPrice(userReducer?.data?.walletBalance)} </span>
                <Switch
                  checked={isCredit}
                  onChange={(checked) => {
                    setIsCredit(checked);
                  }}
                />
              </div>
            )}
            <span className="payButtom" onClick={() => openDrawer('portalDrawer', {
              finalPrice: finalPrice,
              isCredit: isCredit
            })}>
            پرداخت
          </span>
          </>
        )
      } else {
        return (items.map(item => <OrderCard item={item} /> ))
      }
    } else {
      return (
        <>
          {/* <Box component="img" src={emptyCart} width="40%" mx="auto" maxWidth={160}/> */}
          <Typography variant="body1" component="p" textAlign="center" mt={2}>سفارشی موجود نیست</Typography>
        </>
      )
    }
  };

  useEffect(() => {
    switch (tab){
      case tabs.Created:
        setItems(cartReducer.cartItems);
        break;
      case tabs.InProgress:
        setItems(orders.filter(e => [OrderStatus.InProgress, OrderStatus.Assigned, OrderStatus.Paid].includes(e.status)));
        break;
      case tabs.Done:
        setItems(orders.filter(e => e.status == OrderStatus.Done))
        break;
    }
  }, [tab, orders])

  useEffect(() => {
    if (!tab) {
      if (cartReducer.cartItems.length > 0) {
        setTab(tabs.Created);
      } else if (orders.filter(e => [OrderStatus.InProgress, OrderStatus.Assigned, OrderStatus.Paid].includes(e.status)).length > 0) {
        setTab(tabs.InProgress);
      } else {
        setTab(tabs.Done);
      }
    }
    setCounts({
      Created: cartReducer.cartItems.length,
      InProgress: orders.filter(e => [OrderStatus.InProgress, OrderStatus.Assigned, OrderStatus.Paid].includes(e.status)).length,
      Done: orders.filter(e => e.status == OrderStatus.Done).length
    })
  }, [orders])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        paddingTop: '120px',
        paddingBottom: '60px',
        alignItems: 'center',

      }}
    >
      <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        padding: 0
      }}>
        <div className={`cartTabs${tab == tabs.InProgress ? ' selected' : ''}`}>
          {Object.entries(tabTitles).map(([key, value]) => <div className={`cartTab ${tab == key ? ' selected' : ''}`} onClick={() => setTab(key)} >{value}  <span>{counts[key]}</span></div>)}
        </div>
        <section className="cartContainer">
          {content()}
        </section>
      </Container>
    </Box>
  );
}
