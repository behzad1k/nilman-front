import { MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { SelectInput } from '../../../components';
import { useAppSelector } from '../../../services/redux/store';
import globalType from '../../../types/globalType';
import { Addresses } from '../../profile/Addresses';



const AddressStep = ({selected, setSelected, setIsNextStepAllowed}) => {
  const orderReducer = useAppSelector(state => state.orderReducer);
  const {
    control,
    watch
  } = useForm();

  const handleSelectAddress = (address: globalType.Address) => {
    setSelected((prev: globalType.Form) => ({...prev, address: address}));
    setIsNextStepAllowed(true);
  };
  const exWorkers = {};
  for (const exWorker of orderReducer.orders?.filter(e => e.serviceId == selected.service?.id)?.map(e => e.worker)) {
    if (exWorker && exWorker?.id) {
      exWorkers[exWorker.id] = exWorker;
    }
  }
  return (
    <div className="service-step-container">
      {orderReducer.orders?.filter(e => e.serviceId == selected?.service?.id)?.length > 0 &&
          <>
              <p className="hint-text">انتخاب از استایلیست های پیشین</p>
              <SelectInput
                  name="worker"
                  label="استایلیست"
                  control={control}
                  defaultValue={selected?.worker}
                  value={selected?.worker}
                  onChange={(input) => {
                    setSelected(prev => ({
                      ...prev,
                      worker: input.target.value
                    }));
                    // fetchWorkersOff(input.target.value);
                  }}
                  size="medium"
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'var(--mid-pink)',
                      backgroundColor: 'var(--white-pink)',
                      borderRadius: '10px',
                    },
                  }}
              >
                {Object.values(exWorkers)?.map((worker: any) => (
                  <MenuItem key={worker?.id} value={worker?.id}>
                    {worker?.name} {worker?.lastName}
                  </MenuItem>
                ))}
              </SelectInput>
          </>

      }
      <p className="hint-text">انتخاب آدرس</p>

      <section className="cards">
        <Addresses onClick={handleSelectAddress} editable={true} />
      </section>
    </div>
  );
}

export default AddressStep;
