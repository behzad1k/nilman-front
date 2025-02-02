import { Button } from '@mui/material';
import { Warning } from '@phosphor-icons/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import Switch from 'react-ios-switch';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppBar, WebsiteHeader } from '../../components';
import { urls } from '../../services/endPoint';
import { api } from '../../services/http';
import { cart } from '../../services/redux/reducers/cartSlice';
import { SET_LOADING } from '../../services/redux/reducers/loadingSlice';
import { order } from '../../services/redux/reducers/orderSlice';
import { AppDispatch, useAppDispatch, useAppSelector } from '../../services/redux/store';
import comp from '../../types/comp';
import globalType from '../../types/globalType';
import AddressStep from './Steps/addressStep';
import AttributeStep from './Steps/attributeStep';
import ServiceStep from './Steps/serviceStep';
import CalenderStep from './Steps/calenderStep';

const steps: comp.ServiceStep[] = [
  {
    index: 0,
    name: 'service',
  },
  {
    index: 1,
    name: 'attribute',
  },
  {
    index: 2,
    name: 'address',
  },
  {
    index: 3,
    name: 'worker',
  },
];

// Initial
const initialSelected: globalType.Form = {
  service: null,
  attributeStep: null,
  attributes: [],
  address: null,
  price: 0,
  worker: null,
  date: null,
  time: null,
  discount: null,
  isUrgent: false,
  isMulti: false,
  options: {}
};

export default function NewOrder() {
  const prevData = JSON.parse(localStorage.getItem('new-order') as string);
  const prevStep = JSON.parse(localStorage.getItem('step') as string);
  const [selected, setSelected] = useState<globalType.Form>(prevData || {
    ...initialSelected,
    options: {}
  });
  const [isNextStepAllowed, setIsNextStepAllowed] = useState(false);
  const [step, setStep] = useState<comp.ServiceStep>(prevStep || steps[0]);
  const services = useAppSelector(state => state.serviceReducer.allServices);
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  let selectedRef = useRef(selected);
  let stepRef = useRef(step);

  const handleChangeStep = async (action: 'next' | 'prev') => {
    // handle next - prev logic
    if (action === 'next') {
      if (step.index == 1 && !Cookies.get('token')) {
        localStorage.setItem('new-order', JSON.stringify(selectedRef.current));
        localStorage.setItem('step', JSON.stringify(stepRef.current));
        await new Promise(resolve => setTimeout(resolve, 300));
        navigate('/login');
      }
      setStep((prev) => (prev.index === steps.length - 1 ? prev : steps[prev.index + 1]));
      setIsNextStepAllowed(false);
    } else if (action === 'prev') {
      if (!(selected?.attributeStep || selected?.service)) {
        localStorage.removeItem('new-order');
        localStorage.removeItem('step');
      }
      if (step.index == 1) {
        const newParent = services.find(e => e.id == selected.attributeStep?.parent?.id);
        if (!newParent) {
          setStep(steps[0]);
          setSelected(prev => ({
            ...prev,
            attributeStep: null,
            options: {},
            attributes: []
          }));
        } else {
          setSelected(prev => ({
            ...prev,
            attributeStep: services.find(e => e.id == prev.attributeStep?.parent?.id)
          }));
        }
      } else {
        setStep((prev) => (prev.index === 0 ? prev : steps[prev.index - 1]));
      }
    }
  };

  const handleSubmitOrder = async () => {
    if (!selected.date || !selected.time) {
      toast('لطفا تاریخ و ساعت را انتخاب کنید', { type: 'error' });
      return;
    }
    if (Object.keys(selected.options).length === 0) {
      toast('لطفا خدمات انتخاب شده را بررسی کنید', { type: 'error' });
      return;
    }
    const reqOptions = {
      method: 'post',
      body: {
        service: selected.service?.slug,
        attributes: selected.options,
        addressId: selected.address?.id,
        time: selected.time,
        date: selected.date,
        workerId: Number(selected.worker),
        discount: selected.discount,
        isUrgent: selected.isUrgent,
        isMulti: selected.isMulti
      },
    };

    dispatch(SET_LOADING(true));
    const res = await api(urls.order, reqOptions, true);

    if (Object.values(selected.options).filter((e: any) => e?.media?.data)?.length > 0) {
      const formData = new FormData();
      Object.entries(selected.options).filter(([key, value]: any) => value.media?.data).map(([key, value]: any) => formData.append(`files[${key}]`, value.media.data));
      const mediaRes = await axios(process.env.REACT_APP_BASE_URL + urls.orderMedia + res.data?.id, {
        method: 'POST',
        data: formData,
        headers: { Authorization: `Bearer ${Cookies.get('token')}` }
      });
    }

    dispatch(SET_LOADING(false));

    if (res.code === 201) {
      localStorage.removeItem('new-order');
      localStorage.removeItem('step');
      setSelected(initialSelected);
      setSelected(prev => ({
        ...prev,
        service: null,
        options: {}
      }));
      dispatch(order());
      dispatch(cart());
      toast('سفارش شما با موفقیت ثبت شد', { type: 'success' });

      await new Promise(resolve => setTimeout(resolve, 300));
      navigate('/orders');
    } else {
      toast('سفارش شما ثبت نشد, لطفا مجددا تلاش کنید.', { type: 'error' });
    }
  };

  const getPrice = () => {
    let final = 0;
    selected.attributes.map((attr) => (final += attr.price));
    return final;
  };

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    return () => {
      if (selected.service != null) {
        localStorage.setItem('new-order', JSON.stringify(selectedRef.current));
        localStorage.setItem('step', JSON.stringify(stepRef.current));
      } else {
        // console.log('there');
        // localStorage.removeItem('new-order');
        // localStorage.removeItem('step');
      }
    };
  }, []);

  useEffect(() => {
    setSelected((prev) => ({
      ...prev,
      price: getPrice()
    }));
  }, [selected.attributes]);

  useEffect(() => {
    if (!searchParams.get('isUrgent')){
      setSelected(prev => ({ ...prev, date: null, time: null }))
    }
    setSelected(prev => ({
      ...prev,
      isUrgent: searchParams.get('isUrgent') != null,
      isMulti: searchParams.get('isMulti') != null
    }));
  }, [searchParams]);
  return (
    <>
      <WebsiteHeader onBack={step.index > 0 ? () => handleChangeStep('prev') : null}/>
      <main className="newOrderMain">
        <div className="progress">
        <span
          className="progress-active"
          style={{ width: `${((step.index + 1) / 4) * 100}%` }}
        ></span>
        </div>
        {/* <Typography component="span" variant="subtitle2" fontWeight="400" mt={-1} mb={1}> */}
        {/*   مرحله {Intl.NumberFormat('fa').format(step.index + 1)} */}
        {/* </Typography> */}
        {step.name === 'service' && (
          <ServiceStep
            selected={selected}
            setSelected={setSelected}
            setStep={setStep}
          />
        )}
        {step.name === 'attribute' && (
          <AttributeStep
            selected={selected}
            setSelected={setSelected}
            setIsNextStepAllowed={setIsNextStepAllowed}
          />
        )}
        {step.name === 'address' && (
          <AddressStep
            selected={selected}
            setSelected={setSelected}
            setIsNextStepAllowed={setIsNextStepAllowed}
          />
        )}
        {step.name === 'worker' && (
          <CalenderStep
            selected={selected}
            setSelected={setSelected}
          />
        )}
        <div className="bottom-section">
          {selected.isUrgent &&
              <div className="cart-section">
                  <Warning size={25}/>
                  <span className="urgentWarning">سفارش شما در حالت فوری قرار دارد و با افزایش قیمت همراه است</span>
              </div>
          }
          <div className="newOrderBottomButtons">
            <div className="newOrderBottomButtonsRow">
              <span>سفارش فوری</span>
              <Switch
                checked={searchParams.get('isUrgent') != null}
                onChange={(checked) => {
                  checked ? searchParams.set('isUrgent', '') : searchParams.delete('isUrgent');
                  setSearchParams(searchParams);
                }}
              />
            </div>
            {step.index < 2 &&
            <div className="newOrderBottomButtonsRow">
              <span>سفارش گروهی</span>
              <Switch
                checked={searchParams.get('isMulti') != null}
                onChange={(checked) => {
                  checked ? searchParams.set('isMulti', '') : searchParams.delete('isMulti');
                  setSearchParams(searchParams);
                }}
              />
            </div>
            }
          </div>
          <div className="btn-section">

            {/* <Button */}
            {/*   onClick={() => handleChangeStep('prev')} */}
            {/*   size="large" */}
            {/*   variant="outlined" */}
            {/*   color="error" */}
            {/*   disabled={step.index === 0} */}
            {/* > */}
            {/*   مرحله قبل */}
            {/* </Button> */}
            {step.index === steps.length - 1 ? (
              <Button
                onClick={handleSubmitOrder}
                size="large"
                variant="contained"
                color="success"
              >
                ثبت سفارش
              </Button>
            ) : (
              <Button
                onClick={() => handleChangeStep('next')}
                size="large"
                variant="contained"
                color="success"
                disabled={!isNextStepAllowed}
              >
ادامه              </Button>
            )}
          </div>
        </div>
      </main>
      <AppBar/>
    </>
  );
}
