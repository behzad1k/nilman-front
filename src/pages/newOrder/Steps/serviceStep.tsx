import { useRef } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../../services/redux/store';
import comp from '../../../types/comp';
import globalType from '../../../types/globalType';


export default function ServiceStep({
                                      selected,
                                      setSelected,
                                      setStep,
                                    }: comp.IServiceStep) {
  const services = useAppSelector((state) => state.serviceReducer.services);
  const cart = useAppSelector(state => state.cartReducer.cartItems);
  const cardRef = useRef<Array<HTMLElement | null>>([]);

  const handleSelectService = (index: number, service: globalType.Service) => {
    if (cart.find(e => e.serviceId == service.id)) {
      toast(`لطفا ابتدا سفارش ${service.title} فعلی خود را در سبد خرید پرداخت یا حذف کنید`);
      return;
    }
    cardRef.current.map((el, i) =>
      index === i ? el?.classList.add('selected') : el?.classList.remove('selected'),
    );
    setSelected((prev: globalType.Form) => ({
      ...prev,
      service: service,
      attributes: []
    }));
    setStep({
      index: 1,
      name: 'attribute'
    });
  };

  return (
    <div className="service-step-container">
      <section className="cards">
        {[...services].filter(e => e.showInList).sort((a, b) => (a?.sort || 1000) - (b?.sort || 1000)).map((service, index) => (
          <div
            key={service.slug}
            ref={(el) => (cardRef.current[index] = el)}
            onClick={() => handleSelectService(index, service)}
            className={`card service ${selected.service === service ? 'selected' : ''}`}
            style={{
              animation: `slideInFade ${index * 100}ms ease-out forwards`
            }}
          >
            <img src={'/img/' + service.slug + '.png'}/>
            <span>{service.title}</span>
            {/* <i className='cardInfoIcon'></i> */}
          </div>
        ))}
      </section>
    </div>
  );
}
