import { TextField } from '@mui/material';
import { PencilLine } from '@phosphor-icons/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TextInput } from '../../../../../components';
import { Map } from '../../../../../components/common/map.tsx';
import { Header } from '../../../../../components/website/header.tsx';
import { urls } from '../../../../../services/endPoint.ts';
import { api } from '../../../../../services/http.ts';
import { SET_LOADING } from '../../../../../services/redux/reducers/loadingSlice.ts';
import { addresses } from '../../../../../services/redux/reducers/userSlice.ts';
import { useAppSelector } from '../../../../../services/redux/store.ts';
import { Position } from '../../../../../services/types.ts';

const AddressManage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: paramId } = useParams();
  const userReducer = useAppSelector(state => state.userReducer)
  const address = userReducer.addresses.find(e => e.id == paramId)
  const defaultPosition: Position = {
    lat: '35.80761631591913',
    lng: '51.4319429449887'
  }
  const [step, setStep] = useState(1);
  const [position, setPosition] = useState<Position>(address?.longitude && address?.longitude ? { lat: address?.latitude, lng: address?.longitude } : defaultPosition);
  const [form, setForm] = useState({
    title: address?.title,
    phoneNumber: address?.phoneNumber,
    description: address?.description,
    // postalCode: address?.postalCode,
    pelak: address?.pelak,
    vahed: address?.vahed,
  });
  console.log(form);
  const submit = async () => {
    if (step == 1){
      if (position.lng != defaultPosition.lng && position.lat != defaultPosition.lat){
        setStep(prev => prev + 1);
      } else {
        toast('لطفا موقعیت مکانی خود را به درستی وارد کنید', { type: 'error'})
      }
      return;
    }

    if(Object.values(form).filter(e => e == undefined)?.length > 0){
      toast('لطفا تمامی اطلاعات را به درستی وارد کنید', { type: 'error'})
      return;
    }

    dispatch(SET_LOADING(true));

    const res = await api(urls.address + (paramId || '') , { method: 'POST', body: {
        title: form?.title,
        phoneNumber: form?.phoneNumber,
        description: form?.description,
        // postalCode: form?.postalCode,
        pelak: form?.pelak,
        vahed: form?.vahed,
        longitude: position.lng,
        latitude: position.lat
    }}, true)

    if (res.code == 200){
      toast('اطلاعات آدرس با موفقیت ذخیره شد.', { type: 'success'})
      dispatch(addresses());
      navigate(-1)
    }else{
      toast('مشکلی پیش آمده، لطفا مجددا امتحان کنید یا با اپراتور تماس بگیرید', { type: 'error'})
    }

    dispatch(SET_LOADING(false));
  };

  return (
    <>
      <Header onBack={() => navigate('/profile')} />
      <main className='addressManage'>
      <h3>{paramId ? 'ویرایش' : 'افزودن'} آدرس</h3>
        {step == 1 ?
          <>
            <h5>لطفا موقعیت مکانی دقیق خود را روی نقشه انتخاب نمایید</h5>
            <div className="largeMap">
              <Map position={position} setPosition={setPosition}/>
            </div>
          </>
            :
          <section className="editProfile">
            <TextField
              size="small"
              onChange={(input) => setForm(prev => ({ ...prev, title: input.target.value}))}
              value={form?.title}
              fullWidth
              label='عنوان'
              variant="outlined"
              className='textInput'
              placeholder='مثال:‌ خانه'
            />
            {/* <TextField */}
            {/*   size="small" */}
            {/*   onChange={(input) => setForm(prev => ({ ...prev, postalCode: input.target.value}))} */}
            {/*   value={form?.postalCode} */}
            {/*   fullWidth */}
            {/*   label='کد پستی' */}
            {/*   variant="outlined" */}
            {/*   className='textInput' */}
            {/* /> */}
            <TextField
              size="small"
              onChange={(input) => setForm(prev => ({ ...prev, phoneNumber: input.target.value}))}
              value={form?.phoneNumber}
              fullWidth
              label='تلفن'
              variant="outlined"
              className='textInput'
            />
            <TextField
              size="medium"
              value={form?.description}
              onChange={(input) => setForm(prev => ({ ...prev, description: input.target.value}))}
              fullWidth
              label='نشانی'
              rows={5}
              multiline={true}
              variant="outlined"
              className='textInput'
            />
            <div className="addressManageRow">
              <TextField
                size="small"
                value={form?.pelak}
                onChange={(input) => setForm(prev => ({ ...prev, pelak: input.target.value}))}
                label='پلاک'
                variant="outlined"
                className='textInput half'
              />
              <TextField
                size="small"
                value={form?.vahed}
                label='واحد'
                onChange={(input) => setForm(prev => ({ ...prev, vahed: input.target.value}))}
                variant="outlined"
                className='textInput half'
              />
            </div>
          </section>
        }
        <button className='confirmButton addressManageButton' onClick={submit}>
          ثبت
        </button>
      </main>
    </>
  );
};

export default AddressManage;
