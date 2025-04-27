import { Box, Container, Typography } from '@mui/material';
import { useState } from 'react';
import Switch from 'react-ios-switch';
import PortalPickerDrawer from '../../components/drawers/PortalPickerDrawer';
import { useDrawer, useRegisterDrawerComponent } from '../../components/layers/Drawer/DrawerContext';
import { useAppSelector } from '../../services/redux/store';
import { formatPrice } from '../../utils/utils';
import CartItem from './cartItem';

export default function Orders() {
  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
  const userReducer = useAppSelector((state) => state.userReducer);
  const finalPrice = cartItems.reduce((acc, curr) => acc + curr.finalPrice, 0);
  const [isCredit, setIsCredit] = useState(false);

  useRegisterDrawerComponent('portalDrawer', PortalPickerDrawer)

  const { openDrawer } = useDrawer();

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
        <section className="cartContainer">
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((order, index) => (
                <CartItem key={order.id} item={order}/>
              ))}
              <article className="cartItemContainer">
            <span className="orderInfo">
              <h3>فاکتور نهایی</h3>
            </span>
                <div className="orderInfo">
                  <p>جمع کل </p>
                  <span className="orderInfoDelete">
                <p>{formatPrice(cartItems.reduce((acc, curr) => acc + curr.finalPrice, 0))} تومان</p>
              </span>
                </div>
                <span className="orderInfo dashedBottom">
              <p>تخفیف</p>
              <span className="orderInfoDelete">
                <p>{formatPrice(cartItems.reduce((acc, curr) => acc + curr.discountAmount, 0))} تومان</p>
              </span>
            </span>
                <span className="orderInfo">
              <h4>مبلغ قابل پرداخت</h4>
              <h4> {formatPrice(cartItems.reduce((acc, curr) => acc + curr.finalPrice, 0) - (isCredit ? userReducer.data?.walletBalance : 0) < 0 ? 0 : (cartItems.reduce((acc, curr) => acc + curr.finalPrice, 0) - (isCredit ? userReducer.data?.walletBalance : 0)))} تومان</h4>
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
          ) : (
            <>
              {/* <Box component="img" src={emptyCart} width="40%" mx="auto" maxWidth={160}/> */}
              <Typography variant="body1" component="p" textAlign="center" mt={2}>
                سبد خرید شما خالی است
              </Typography>
            </>
          )}
        </section>
      </Container>
    </Box>
  );
}
