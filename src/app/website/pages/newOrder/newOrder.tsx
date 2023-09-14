import {useEffect, useState, useCallback} from 'react';
import {Button, Skeleton} from '@mui/material';
import {IAddress, IService, IUser} from '../../../../services/types.ts';
import ServiceStep from './serviceStep.tsx';
import AttributeStep from './attributeStep.tsx';
import AddressStep from './addressStep.tsx';
import WorkerStep from './workerStep.tsx';
import {formatPrice} from '../../../../utils/utils.ts';
import {urls} from '../../../../services/endPoint.ts';
import {api} from '../../../../services/http.ts';
import moment from 'jalali-moment';

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
  attributes: IService[] | [];
  address: IAddress | null;
  worker: string | null;
  date: number | null;
  time: number | null;
};

// Initial
const initialSelected: Selected = {
  service: null,
  attributes: [],
  address: null,
  worker: null,
  date: null,
  time: null,
};

export default function NewOrder() {
  // React
  const [selected, setSelected] = useState<Selected>(initialSelected);
  const [workers, setWorkers] = useState<IUser[] | []>([]);
  const [nearest, setNearest] = useState<{date: string; workerId: number} | null>(null);
  const [isNextStepAllowed, setIsNextStepAllowed] = useState(false);
  const [step, setStep] = useState<Step>(steps[0]);
  let section = 0;

  // Fns
  const getAreaWorkers = useCallback(async () => {
    selected.attributes.forEach((attr) => (section += attr.section));
    const params = new URLSearchParams({
      addressId: String(selected.address?.id),
      serviceId: String(selected.service?.id),
      section: String(section),
    });
    const res = await api(urls.ariaWorker + '?' + params, {}, true);
    console.log(res);
    if (res.code === 200) {
      setWorkers(res.data.workers);
      setNearest(res.data.nearest);
      console.log(res.data);
    }
  }, [selected.address, selected.service]);

  // Handlers
  const handleChangeStep = (action: 'next' | 'prev') => {
    // handle next - prev logic
    if (action === 'next')
      setStep((prev) => (prev.index === steps.length - 1 ? prev : steps[prev.index + 1]));
    if (action === 'prev')
      setStep((prev) => (prev.index === 0 ? prev : steps[prev.index - 1]));

    // set next btn disabled when we go to a new step
    setIsNextStepAllowed(false);
  };

  const handleSubmitOrder = async () => {
    const reqOptions = {
      method: 'post',
      body: {
        service: selected.service?.slug,
        attributes: selected.attributes.map((attr) => attr.slug),
        addressId: selected.address?.id,
        time: selected.time,
        date: selected.date,
        workerId: Number(selected.worker),
      },
    };
    const res = await api(urls.order, reqOptions, true);
    console.log('res is: ', res);

    if (res.code === 201) {
      // console.log(res);
      // dispatch(order());
      // dispatch(cart());
    }
  };

  useEffect(() => {
    // Fetch needed data based on step
    console.log('here1');
    console.log(step.name)
    if (step.name === 'worker') {
      console.log('here2');

      getAreaWorkers();
    }
  }, [step]);

  useEffect(() => {
    console.log(selected.service);
  }, [selected.service]);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  // const {register, handleSubmit, control, getValues, reset} = useForm();

  // const onSubmit = async (data: FieldValues) => {
  //   const reqOptions = {
  //     method: 'post',
  //     body: {
  //       ...data,
  //       date: Math.floor(new Date(date).getTime() / 1000),
  //     },
  //   };
  //   const res = await api(urls.order, reqOptions, true);
  //   if (res.code === 201) {
  //     reset();
  //     dispatch(order());
  //     dispatch(cart());
  //   }
  // };

  return (
    <main className="newOrderMain">
      <div className="progress">
        <span
          className="progress-active"
          style={{width: `${((step.index + 1) / 4) * 100}%`}}
        ></span>
      </div>
      {step.name === 'service' && (
        <ServiceStep
          setSelected={setSelected}
          setIsNextStepAllowed={setIsNextStepAllowed}
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
        <div className="cart-section">
          <div className="info">
            {selected.attributes[0]?.title ? (
              <h1>
                {selected.service?.title}, {selected.attributes[0]?.title}
              </h1>
            ) : (
              <Skeleton variant="text" animation="pulse" width={200} />
            )}
            <div>
              {selected.worker ? (
                <p className="worker">
                  {
                    // TODO FIX LATER
                    workers.filter((worker) => worker.id === Number(selected.worker))[0]
                      .name
                  }{' '}
                  {
                    // TODO FIX LATER
                    workers.filter((worker) => worker.id === Number(selected.worker))[0]
                      .lastName
                  }
                </p>
              ) : (
                <Skeleton variant="text" animation="pulse" width={50} />
              )}
              <span className="circle"></span>
              {selected.time ? (
                <time className="date-time">
                  {selected.time} | {selected.date}
                </time>
              ) : (
                <Skeleton variant="text" animation="pulse" width={80} />
              )}
            </div>
          </div>
          <div className="price">
            <p>{formatPrice(540000)}</p>
          </div>
        </div>
        <div className="btn-section">
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
          <Button
            onClick={() => handleChangeStep('prev')}
            size="large"
            variant="outlined"
            color="error"
            disabled={step.index === 0}
          >
            مرحله قبل
          </Button>
        </div>
      </div>
    </main>
  );
}
