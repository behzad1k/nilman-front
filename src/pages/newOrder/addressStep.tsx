import globalType from '../../types/globalType.ts';
import { Addresses } from '../profile/Addresses';



const AddressStep = ({selected, setSelected, setIsNextStepAllowed}) => {
  const handleSelectAddress = (address: globalType.Address) => {
    setSelected((prev: globalType.Form) => ({...prev, address: address}));
    setIsNextStepAllowed(true);
  };

  return (
    <div className="service-step-container">
      <p className="hint-text">لطفا از لیست آدرس ها یک مورد را انتخاب کنید و یا اضافه کنید.</p>
      <section className="cards">
        <Addresses onClick={handleSelectAddress} editable={false} />
      </section>
    </div>
  );
}

export default AddressStep;
