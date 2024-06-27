import {useRef, useEffect} from 'react';
import {useAppSelector} from '../../../../services/redux/store';
import {IService} from '../../../../services/types';
import {Selected} from './newOrder';

type Props = {
  selected: Selected;
  setSelected: (val: (prev: Selected) => Selected) => void;
  setStep: (val: any) => void;
};

export default function ServiceStep({
  selected,
  setSelected,
  setStep,
}: Props) {
  const services = useAppSelector((state) => state.serviceReducer.services);

  const cardRef = useRef<Array<HTMLElement | null>>([]);

  const handleSelectService = (index: number, service: IService) => {
    cardRef.current.map((el, i) =>
      index === i ? el?.classList.add('selected') : el?.classList.remove('selected'),
    );

    setStep({ index: 1, name: 'attribute'})
    setSelected((prev: Selected) => ({...prev, service: service, attributes: []}));
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
            className={`card ${selected.service === service ? 'selected' : ''}`}
          >
            <img src={'/img/' + service.slug + '.png'} />
            <h2>{service.title}</h2>
            <i className='cardInfoIcon'></i>
          </div>
        ))}
      </section>
    </div>
  );
}
