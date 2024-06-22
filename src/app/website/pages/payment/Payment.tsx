import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { urls } from '../../../../services/endPoint.ts';
import { api } from '../../../../services/http.ts';
import { SET_LOADING } from '../../../../services/redux/reducers/loadingSlice.ts';

const Payment = ({ params }) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const dispatch = useDispatch()
  const [isSuccessful, setIsSuccessful] = useState(false)
  const send = async () => {
    dispatch(SET_LOADING(true));

    const res = await api(urls.paymentVerify, { method: 'POST', body: { authority: searchParam.get('Authority') }})

    if (res.code == 200){
      setIsSuccessful(true);
    }
    dispatch(SET_LOADING(false));
  };

  useEffect(() => {
  }, []);

  return (
    <div>
      {isSuccessful ? 'پرداخت ناموفق' : 'پرداخت موفق'}
    </div>
  );
};

export default Payment;
