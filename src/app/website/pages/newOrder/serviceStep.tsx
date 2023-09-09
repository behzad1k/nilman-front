import {useRef} from 'react';
import {useAppSelector} from '../../../../services/redux/store';
import {IService} from '../../../../services/types';
import {Selected} from './newOrder';

type Props = {
  setSelected: (val: (prev: Selected) => Selected) => void;
  setIsNextStepAllowed: (val: boolean) => void;
};

export default function ServiceStep({setSelected, setIsNextStepAllowed}: Props) {
  const services = useAppSelector((state) => state.serviceReducer.services);

  const cardRef = useRef<Array<HTMLElement | null>>([]);

  const handleSelectService = (index: number, service: IService) => {
    cardRef.current.map((el, i) =>
      index === i ? el?.classList.add('selected') : el?.classList.remove('selected'),
    );

    setSelected((prev: Selected) => ({...prev, service}));
    setIsNextStepAllowed(true);
  };

  return (
    <div className="service-step-container">
      <p className="hint-text">لطفا از لیست خدمات یک مورد را انتخاب کنید.</p>
      <section className="cards">
        {services.map((service, index) => (
          <div
            key={service.slug}
            ref={(el) => (cardRef.current[index] = el)}
            onClick={() => handleSelectService(index, service)}
            className="card"
          >
            <h2>{service.title}</h2>
          </div>
        ))}
      </section>
    </div>
  );
}
