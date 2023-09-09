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

export default function NewOrder() {
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [selectedAttributes, setSelectedAttributes] = useState<IService[] | []>([]);
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const [selectedWorkerDate, setSelectedWorkerDate] = useState<any>(null);
  const [workers, setWorkers] = useState<IUser[] | []>([]);
  const [isNextStepAllowed, setIsNextStepAllowed] = useState(false);
  const [step, setStep] = useState<Step>(steps[0]);

  const getAreaWorkers = useCallback(async () => {
    console.log(selectedAddress, selectedService);

    const params = new URLSearchParams({
      addressId: String(selectedAddress?.id),
      serviceId: String(selectedService?.id),
      // attributeId: String(1),
    });
    const res = await api(urls.ariaWorker + '?' + params, {}, true);
    console.log(res);
    if (res.code === 200) {
      setWorkers(res.data.workers);
      console.log(res.data);
    }
  }, [selectedService, selectedAddress]);

  const handleChangeStep = (action: 'next' | 'prev') => {
    // handle next - prev logic
    if (action === 'next')
      setStep((prev) => (prev.index === steps.length - 1 ? prev : steps[prev.index + 1]));
    if (action === 'prev')
      setStep((prev) => (prev.index === 0 ? prev : steps[prev.index - 1]));

    // set next btn disabled when we go to a new step
    setIsNextStepAllowed(false);
  };

  const handleSubmitOrder = () => {};

  useEffect(() => {
    // Fetch needed data based on step
    console.log('here1');

    if (step.name === 'worker') {
      console.log('here2');

      getAreaWorkers();
    }
  }, [step]);

  useEffect(() => {
    console.log(selectedAddress);
  }, [selectedAddress]);

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
          setSelectedService={setSelectedService}
          setIsNextStepAllowed={setIsNextStepAllowed}
        />
      )}
      {step.name === 'attribute' && selectedService?.attributes && (
        <AttributeStep
          attributes={selectedService.attributes}
          setSelectedAttributes={setSelectedAttributes}
          setIsNextStepAllowed={setIsNextStepAllowed}
        />
      )}
      {step.name === 'address' && (
        <AddressStep
          setSelectedAddress={setSelectedAddress}
          setIsNextStepAllowed={setIsNextStepAllowed}
        />
      )}
      {step.name === 'worker' && (
        <WorkerStep
          selectedService={selectedService}
          workers={workers}
          setSelectedWorkerDate={setSelectedWorkerDate}
          setIsNextStepAllowed={setIsNextStepAllowed}
        />
      )}
      <div className="bottom-section">
        <div className="cart-section">
          <div className="info">
            {selectedAttributes[0]?.title ? (
              <h1>
                {selectedService?.title}, {selectedAttributes[0]?.title}
              </h1>
            ) : (
              <Skeleton variant="text" animation="pulse" width={200} />
            )}
            <div>
              {selectedWorkerDate?.worker ? (
                <p className="worker">{selectedWorkerDate.worker}</p>
              ) : (
                <Skeleton variant="text" animation="pulse" width={50} />
              )}
              <span className="circle"></span>
              {selectedWorkerDate?.date ? (
                <time className="date-time">
                  {selectedWorkerDate.time} | {selectedWorkerDate.date}
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
