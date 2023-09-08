import {useAppSelector} from '../../../../services/redux/store';
import {IAddress} from '../../../../services/types';
import {AddressRow} from '../profile/addressRow';
import {useRef} from 'react';

type Props = {
  setSelectedAddress: (val: IAddress) => void;
  setIsNextStepAllowed: (val: boolean) => void;
};

export default function AddressStep({setSelectedAddress, setIsNextStepAllowed}: Props) {
  const addresses = useAppSelector((state) => state.userReducer.addresses);

  const cardRef = useRef<Array<HTMLElement | null>>([]);

  const handleSelectAddress = (index: number, address: IAddress) => {
    cardRef.current.map((el, i) =>
      index === i ? el?.classList.add('selected') : el?.classList.remove('selected'),
    );

    setSelectedAddress(address);
    setIsNextStepAllowed(true);
  };

  return (
    <div className="service-step-container">
      <p className="hint-text">لطفا از لیست خدمات یک مورد را انتخاب کنید.</p>
      <section className="cards">
        {addresses.map((address, index) => (
          <div
            ref={(el) => (cardRef.current[index] = el)}
            onClick={() => handleSelectAddress(index, address)}
            className="address-step-cardcontainer"
          >
            <AddressRow key={index} address={address} />
          </div>
        ))}
      </section>
    </div>
  );
}
