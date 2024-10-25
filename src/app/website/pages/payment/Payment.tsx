import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { urls } from '../../../../services/endPoint';
import { api } from '../../../../services/http';
import { cart } from '../../../../services/redux/reducers/cartSlice';
import { SET_LOADING } from '../../../../services/redux/reducers/loadingSlice';
import { order } from '../../../../services/redux/reducers/orderSlice';

const Payment = ({ params }) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [isSuccessful, setIsSuccessful] = useState(searchParam.get('Status') == 'OK')
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const send = async () => {
    dispatch(SET_LOADING(true));

    const res = await api(urls.paymentVerify, { method: 'POST', body: { authority: searchParam.get('Authority'), status: searchParam.get('Status') }}, true  )

    if (res.code == 200){
      setIsSuccessful(true);
      dispatch(cart());
      dispatch(order());
    }else {
      setIsSuccessful(false);
    }
    dispatch(SET_LOADING(false));
  };

  useEffect(() => {
send()
  }, []);

  return (
    <div className='paymentContainer'>
      {isSuccessful ?
        <div className='payment'>
          <img className='paymentImage' src='/img/checked.png'/>
          <span>پرداخت شما موفقیت آمیز بود</span>
        </div>
        :
        <div className='payment'>
          <img className='paymentImage' src='/img/cancel.png'/>
          <span>پرداخت موفقیت آمیز نبود</span>
        </div>
      }
      <button onClick={() => navigate('/orders')} className={`paymentButton ${isSuccessful ? 'successful' : 'unSuccessful'}`}>بازگشت به صفحه سفارشات</button>
    </div>
  );
};

export default Payment;
