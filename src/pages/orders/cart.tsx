import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import Switch from 'react-ios-switch';
import emptyCart from '../../assets/img/empty-cart.png';
import PortalPickerDrawer from '../../components/drawers/PortalPickerDrawer';
import { useDrawer } from '../../components/layers/Drawer/DrawerContext';
import { PaymentMethods } from '../../enums/enums';
import { useAppSelector } from '../../services/redux/store';
import { formatPrice } from '../../utils/utils';
import CartItem from './cartItem';

export default function Cart() {
  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
  const userReducer = useAppSelector((state) => state.userReducer);
  const finalPrice = cartItems.reduce((acc, curr) => acc + curr.finalPrice, 0);

  const { openDrawer } = useDrawer();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<keyof typeof PaymentMethods>('sep');
  const [isCredit, setIsCredit] = useState(false);

  useEffect(() => {
    if (isCredit && userReducer?.data?.walletBalance >= finalPrice){
      setSelectedPaymentMethod("credit")
    }
  }, [isCredit]);

  return (
    <section className="cartContainer">
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((order, index) => (
            <CartItem key={index} item={order}/>
          ))}
          <article className="cartItemContainer">
            <span className="orderInfo">
              <h3>فاکتور نهایی</h3>
            </span>
            <span className="orderInfo">
          <p>جمع کل </p>
          <span className="orderInfoDelete">
            <p>{formatPrice(cartItems.reduce((acc, curr) => acc + curr.finalPrice, 0))} تومان</p>
          </span>
              </span>
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
              <Switch checked={isCredit}
                      onChange={(checked) => {
                        setIsCredit(checked)
                      }}/>
            </div>
          )}
          <span className="payButtom" onClick={() => openDrawer(<PortalPickerDrawer selectedPaymentMethod={selectedPaymentMethod} setSelectedPaymentMethod={setSelectedPaymentMethod} />, 'bottom')}>
            پرداخت
          </span>
        </>
      ) : (
        <>
          <Box component="img" src={emptyCart} width="40%" mx="auto" maxWidth={160}/>
          <Typography variant="body1" component="p" textAlign="center" mt={2}>
            سبد خرید شما خالی است
          </Typography>
        </>
      )}
    </section>
  );
}
