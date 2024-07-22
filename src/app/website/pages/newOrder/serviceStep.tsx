import {useRef, useEffect} from 'react';
import { toast } from 'react-toastify';
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
  const cart = useAppSelector(state => state.cartReducer.cartItems);
  const cardRef = useRef<Array<HTMLElement | null>>([]);

  const handleSelectService = (index: number, service: IService) => {
    if(cart.find(e => e.serviceId == service.id)){
      toast(`لطفا ابتدا سفارش ${service.title} فعلی خود را در سبد خرید پرداخت یا حذف کنید`)
      return
    }
    cardRef.current.map((el, i) =>
      index === i ? el?.classList.add('selected') : el?.classList.remove('selected'),
    );
    console.log(service);
    setSelected((prev: Selected) => ({...prev, service: service, attributes: []}));
    setStep({ index: 1, name: 'attribute'})
  };
  console.log(selected);
  return (
    <div className="service-step-container">
      <section className="cards">
        {[...services].sort((a, b) => (a?.sort || 1000) - (b?.sort || 1000)).map((service, index) => (
          <div
            key={service.slug}
            ref={(el) => (cardRef.current[index] = el)}
            onClick={() => handleSelectService(index, service)}
            className={`card service ${selected.service === service ? 'selected' : ''} ${index % 2 == 0 ? 'reversed' : ''}`}
          >
            <img src={'/img/' + service.slug + '.png'} />
            <p>{service.title}</p>
            {/* <i className='cardInfoIcon'></i> */}
          </div>
        ))}
      </section>
    </div>
  );
}
