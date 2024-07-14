import { Warning } from '@phosphor-icons/react';
import Cookies from 'js-cookie';
import {useEffect, useState, useCallback, useRef} from 'react';
import {Button, Typography} from '@mui/material';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {toast} from 'react-toastify';
import {cart} from '../../../../services/redux/reducers/cartSlice.ts';
import {order} from '../../../../services/redux/reducers/orderSlice.ts';
import { useAppDispatch, useAppSelector } from '../../../../services/redux/store.ts';
import { IAddress, IService, IUser, SelectedOptions } from '../../../../services/types.ts';
import ServiceStep from './serviceStep.tsx';
import AttributeStep from './attributeStep.tsx';
import AddressStep from './addressStep.tsx';
import WorkerStep from './workerStep.tsx';
import {formatPrice} from '../../../../utils/utils.ts';
import {urls} from '../../../../services/endPoint.ts';
import {api} from '../../../../services/http.ts';
import axios from 'axios';

import moment from 'jalali-moment';
import {SET_LOADING} from '../../../../services/redux/reducers/loadingSlice.ts';

// Types
type Step = {
  index: number;
  name: 'service' | 'attribute' | 'address' | 'worker';
};

const steps: Step[] = [
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

export type Selected = {
  service: IService | null;
  attributeStep: IService | null;
  attributes: IService[];
  address: IAddress | null;
  price: number;
  worker: string | null;
  date: number | null;
  time: number | null;
  discount: string | null;
  isUrgent: boolean
  options: SelectedOptions
};

// Initial
const initialSelected: Selected = {
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
  options: {}
};

export default function NewOrder() {
  // React
  const prevData = JSON.parse(sessionStorage.getItem('new-order') as string);
  const prevStep = JSON.parse(sessionStorage.getItem('step') as string);
  const [selected, setSelected] = useState<Selected>(prevData || initialSelected);
  const [workers, setWorkers] = useState<IUser[] | []>([]);
  const [nearest, setNearest] = useState<{date: string; workerId: number} | null>(null);
  const [isNextStepAllowed, setIsNextStepAllowed] = useState(false);
  const [step, setStep] = useState<Step>(prevStep || steps[0]);
  const services = useAppSelector(state => state.serviceReducer.allServices);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  let section = 0;
  let selectedRef = useRef(selected);
  let stepRef = useRef(step);
  // Fns
  const getAreaWorkers = useCallback(async () => {
    selected.attributes.forEach((attr) => (section += attr.section));
    const params = new URLSearchParams({
      addressId: String(selected.address?.id),
      serviceId: String(selected.service?.id),
      section: String(section),
    });
    dispatch(SET_LOADING(true));
    const res = await api(urls.ariaWorker + '?' + params, {}, true);
    dispatch(SET_LOADING(false));
    if (res.code === 200) {
      setWorkers(res.data.workers);
      setNearest(res.data.nearest);
    }
  }, [selected.address, selected.service]);

  // Handlers
  const handleChangeStep = (action: 'next' | 'prev') => {
    // handle next - prev logic
    if (action === 'next') {
        setStep((prev) => (prev.index === steps.length - 1 ? prev : steps[prev.index + 1]));
    }
    if (action === 'prev') {
      if (step.index == 1){
        const newParent = services.find(e => e.id == selected.attributeStep?.parent?.id);
        if(!newParent){
          setStep(steps[0])
          setSelected(prev => ({ ...prev, attributeStep: null }))
        }else{
          setSelected(prev => ({...prev, attributeStep: services.find(e => e.id == prev.attributeStep?.parent?.id) }))
        }
      }else {
        setStep((prev) => (prev.index === 0 ? prev : steps[prev.index - 1]));
      }
    }

    // set next btn disabled when we go to a new step
    // setIsNextStepAllowed(false);
  };

  const handleSubmitOrder = async () => {
    console.log(selected.date);
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
        isUrgent: selected.isUrgent
      },
    };

    dispatch(SET_LOADING(true));
    const res = await api(urls.order, reqOptions, true);
    dispatch(SET_LOADING(false));

    if (Object.values(selected.options).filter((e: any) => e.media?.data).length > 0){
      const formData = new FormData();
      Object.entries(selected.options).filter(([key, value]: any) => value.media?.data).map(([key, value]: any) => formData.append(`files[${key}]`,value.media.data))
      const mediaRes = await axios(process.env.REACT_APP_BASE_URL + urls.orderMedia + res.data?.id, { method: 'POST', data: formData, headers: { Authorization: `Bearer ${Cookies.get('token')}`}});
    }

    if (res.code === 201) {
      toast('سفارش شما با موفقیت ثبت شد', {type: 'success'});
      sessionStorage.removeItem('new-order');
      sessionStorage.removeItem('step');
      setSelected(initialSelected)
      dispatch(order());
      dispatch(cart());
      await setTimeout(() => { navigate('/orders')}, 300)
    } else {
      toast('سفارش شما ثبت نشد, لطفا مجددا تلاش کنید.', {type: 'error'});
    }
  };

  const getPrice = () => {
    let final = 0;
    selected.attributes.map((attr) => (final += attr.price));
    return final;
  };

  useEffect(() => {
    // Fetch needed data based on step
    if (step.name === 'worker') {
      getAreaWorkers();
    }
  }, [step]);

  useEffect(() => {
    selectedRef.current = selected;    
  }, [selected]);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    return () => {
      if(selected.service != null) {
        sessionStorage.setItem('new-order', JSON.stringify(selectedRef.current));
        sessionStorage.setItem('step', JSON.stringify(stepRef.current));
      }
    };
  }, []);

  useEffect(() => {
    setSelected((prev) => ({...prev, price: getPrice()}));
  }, [selected.attributes]);

  useEffect(() => {
    setSelected(prev => ({ ...prev, isUrgent: searchParams.get('isUrgent') != null}))
  }, []);

  return (
    <main className="newOrderMain">
      <div className="progress">
        <span
          className="progress-active"
          style={{width: `${((step.index + 1) / 4) * 100}%`}}
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
        <WorkerStep
          selected={selected}
          setSelected={setSelected}
          workers={workers}
          nearest={nearest}
          setIsNextStepAllowed={setIsNextStepAllowed}
        />
      )}
      <div className="bottom-section">
        {selected.isUrgent &&
        <div className="cart-section">
          <Warning size={25}/>
          <span className='urgentWarning'>سفارش شما در حالت فوری قرار دارد و با افزایش قیمت همراه است</span>
          <span className='urgentWarning button' onClick={() => {
            searchParams.delete('isUrgent');
            setSearchParams(searchParams);
            setSelected(prev => ({ ...prev, isUrgent: false }))
          }}>خروج</span>

          {/* <div className="info"> */}
          {/*   {selected.service ? ( */}
          {/*     <h1> */}
          {/*       {selected.service?.title} {`>`} */}
          {/*       {selected.attributes.map( */}
          {/*         (attr, index) => (index === 0 ? ' ' : ', ') + attr.title, */}
          {/*       )} */}
          {/*     </h1> */}
          {/*   ) : ( */}
          {/*     'در حال انتخاب...' */}
          {/*   )} */}
          {/*   <div> */}
          {/*     {selected.address && <p className="worker">{selected.address.title}</p>} */}
          {/*     <span className="circle"></span> */}
          {/*     {selected.time && ( */}
          {/*       <time className="date-time"> */}
          {/*         {selected.time} |{' '} */}
          {/*         {selected.date && moment.unix(selected.date).format('jYYYY/jMM/jDD')} */}
          {/*       </time> */}
          {/*     )} */}
          {/*   </div> */}
          {/* </div> */}
          {/* <div className="price"> */}
          {/*   <p>{formatPrice(selected.price)} تومان</p> */}
          {/* </div> */}
        </div>
        }
        <div className="btn-section">
          <Button
            onClick={() => handleChangeStep('prev')}
            size="large"
            variant="outlined"
            color="error"
            disabled={step.index === 0}
          >
            مرحله قبل
          </Button>
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
              color="info"
              disabled={!isNextStepAllowed}
            >
              مرحله بعد
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
