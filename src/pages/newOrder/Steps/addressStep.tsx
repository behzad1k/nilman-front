import { MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { SelectInput } from '../../../components';
import { useAppSelector } from '../../../services/redux/store';
import globalType from '../../../types/globalType';
import { Addresses } from '../../profile/Addresses';



const AddressStep = ({selected, setSelected, setIsNextStepAllowed}) => {
  const userReducer = useAppSelector(state => state.userReducer);
  const {
    control,
    watch
  } = useForm();

  const handleSelectAddress = (address: globalType.Address) => {
    setSelected((prev: globalType.Form) => ({...prev, address: address}));
    setIsNextStepAllowed(true);
  };

  const availableWorkers = userReducer.workers.filter(worker =>
    Object.keys(selected.options).every(serviceId =>
      worker.services.some(service => service.id == serviceId)
    )
  );

  return (
    <div className="service-step-container">
      {availableWorkers.length > 0 && userReducer.data?.isWorkerChoosable &&
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
                  <MenuItem value={0}>
                      انتخاب خودکار
                  </MenuItem>
                {userReducer.workers?.map((worker: any) => (
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
