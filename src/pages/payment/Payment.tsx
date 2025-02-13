import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { urls } from '../../services/endPoint';
import { api } from '../../services/http';
import { cart } from '../../services/redux/reducers/cartSlice';
import { SET_LOADING } from '../../services/redux/reducers/loadingSlice';
import { order } from '../../services/redux/reducers/orderSlice';
import { setPaymentData } from '../../services/redux/reducers/paymentSlice';
import { useAppDispatch, useAppSelector } from '../../services/redux/store';

const Payment = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const [isSuccessful, setIsSuccessful] = useState(searchParam.get('Status') == 'OK' || searchParam.get('State') == 'OK');
  const paymentData = useAppSelector(state => state.paymentReducer.paymentData);
  const send = async () => {
    dispatch(SET_LOADING(true));

    const res = await api(urls.paymentVerify, {
      method: 'POST',
      body: {
        authority: searchParam.get('Authority') || searchParam.get('Token'),
        status: searchParam.get('Status') || searchParam.get('State'),
        terminalId: searchParam.get('TerminalId'),
        refNum: searchParam.get('RefNum')
      }
    }, true);

    if (res.code == 200) {
      setIsSuccessful(true);
      dispatch(cart());
      dispatch(order());
    } else {
      setIsSuccessful(false);
    }
    dispatch(SET_LOADING(false));
  };

  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);
      const clone = response.clone();
      try {
        const body = await clone.json();
        console.log('Payment Data:', body); // This will show your request body
      } catch (error) {
        console.log('Processing payment data...');
      }
      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);


  console.log(paymentData);
  useEffect(() => {
    // Intercept and capture the POST request
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);
      const clone = response.clone();
      try {
        const body = await clone.json();
        dispatch(setPaymentData(body));
      } catch (error) {
        console.log('Processing payment data...');
      }
      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [dispatch]);

  useEffect(() => {
    if (isSuccessful) {
      send();
    }
  }, []);

  return (
    <div className="paymentContainer">
      {isSuccessful ?
        <div className="payment">
          <img className="paymentImage" src="/img/checked.png"/>
          <span>پرداخت شما موفقیت آمیز بود</span>
        </div>
        :
        <div className="payment">
          <img className="paymentImage" src="/img/cancel.png"/>
          <span>پرداخت موفقیت آمیز نبود</span>
        </div>
      }
      <button onClick={() => navigate('/orders')} className={`paymentButton ${isSuccessful ? 'successful' : 'unSuccessful'}`}>بازگشت به صفحه سفارشات</button>
    </div>
  );
};

export default Payment;
