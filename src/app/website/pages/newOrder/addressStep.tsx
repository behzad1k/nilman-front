import {useAppSelector} from '../../../../services/redux/store';
import {IAddress} from '../../../../services/types';
import { Addresses } from '../profile/Addresses.tsx';
import {AddressRow} from '../profile/addressRow';
import {useRef} from 'react';
import {Selected} from './newOrder';

type Props = {
  selected: Selected;
  setSelected: (val: (prev: Selected) => Selected) => void;
  setIsNextStepAllowed: (val: boolean) => void;
};

export default function AddressStep({selected, setSelected, setIsNextStepAllowed}: Props) {
  const handleSelectAddress = (address: IAddress) => {
    setSelected((prev: Selected) => ({...prev, address: address}));
    setIsNextStepAllowed(true);
  };
  return (
    <div className="service-step-container">
      <p className="hint-text">لطفا از لیست آدرس ها یک مورد را انتخاب کنید و یا اضافه کنید.</p>
      <section className="cards">
        <Addresses onClick={handleSelectAddress}/>
      </section>
    </div>
  );
}
