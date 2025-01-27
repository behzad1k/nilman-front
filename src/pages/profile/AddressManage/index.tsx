import { TextField } from '@mui/material';
import '@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Neshan from '../../../components/common/Neshan';
import { Header } from '../../../components/website/header';
import { urls } from '../../../services/endPoint';
import { api } from '../../../services/http';
import { SET_LOADING } from '../../../services/redux/reducers/loadingSlice';
import { addresses } from '../../../services/redux/reducers/userSlice';
import { useAppDispatch, useAppSelector } from '../../../services/redux/store';
import globalType from '../../../types/globalType';

const defaultPosition: globalType.Position = {
  lat: '35.80761631591913',
  lng: '51.4319429449887'
};

const AddressManage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id: paramId } = useParams();
  const userReducer = useAppSelector(state => state.userReducer);
  const address = userReducer.addresses.find(e => e.id == Number(paramId));
  const [step, setStep] = useState(1);

  const [position, setPosition] = useState<globalType.Position>(address?.longitude && address?.longitude ? {
    lat: address?.latitude,
    lng: address?.longitude
  } : defaultPosition);
  const [form, setForm] = useState({
    title: address?.title,
    phoneNumber: address?.phoneNumber,
    description: address?.description,
    // postalCode: address?.postalCode,
    pelak: address?.pelak,
    vahed: address?.vahed,
    districtId: address?.districtId,
    floor: address?.floor
  });

  const submit = async () => {
    if (step == 1) {
      if (position.lng != defaultPosition.lng && position.lat != defaultPosition.lat) {
        const res = await api(urls.addressGeo, {
          query: {
            lng: position.lng,
            lat: position.lat
          }
        });
        const districts = [1, 2, 3, 4, 5, 6, 7, 8, 22]
        if (res.code == 200) {
          if (!districts.includes(Number(res.data.municipality_zone)) || res.data.city != 'تهران') {
            toast('موقعیت مکانی انتخاب شده در محدوده پشتیانی نیلمان نمی باشد', { type: 'error' });
            return;
          }
          if (!paramId) {
            setForm(prev => ({
              ...prev,
              description: res.data.formatted_address
            }));
          }
          setForm(prev => ({
            ...prev,
            districtId: res.data.municipality_zone
          }));
          setStep(prev => prev + 1);
        }
      } else {
        toast('لطفا موقعیت مکانی خود را به درستی وارد کنید', { type: 'error' });
      }
      return;
    }
    if (!form?.description || !form.pelak || !form.vahed) {
      // toast('لطفا تمامی اطلاعات را به درستی وارد کنید', { types: 'error' });
      return;
    }

    dispatch(SET_LOADING(true));

    const res = await api(urls.address + (paramId || ''), {
      method: 'POST',
      body: {
        title: form?.title,
        phoneNumber: form?.phoneNumber,
        description: form?.description,
        // postalCode: form?.postalCode,
        pelak: form?.pelak,
        vahed: form?.vahed,
        longitude: position.lng,
        latitude: position.lat,
        district: form?.districtId,
        floor: form?.floor
      }
    }, true);

    if (res.code == 200) {
      toast('اطلاعات آدرس با موفقیت ذخیره شد.', { type: 'success' });
      dispatch(addresses());
      navigate(-1);
    } else {
      toast('مشکلی پیش آمده، لطفا مجددا امتحان کنید یا با اپراتور تماس بگیرید', { type: 'error' });
    }

    dispatch(SET_LOADING(false));
  };

  return (
    <>
      <Header onBack={() => navigate('/profile')}/>
      <form className="addressManage">
        <h3>{paramId ? 'ویرایش' : 'افزودن'} آدرس</h3>
        {step == 1 ?
          <>
            <h5>لطفا موقعیت مکانی دقیق خود را روی نقشه انتخاب نمایید</h5>
            <Neshan position={position} setPosition={setPosition}/>


          </>
          :
          <section className="editProfile">
            <TextField
              size="small"
              onChange={(input) => setForm(prev => ({
                ...prev,
                title: input.target.value
              }))}
              value={form?.title}
              fullWidth
              label="عنوان"
              variant="outlined"
              className="textInput"
              placeholder="مثال:‌ خانه"
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
              onChange={(input) => setForm(prev => ({
                ...prev,
                phoneNumber: input.target.value
              }))}
              value={form?.phoneNumber}
              fullWidth
              label="تلفن"
              variant="outlined"
              className="textInput"
            />
            <TextField
              size="medium"
              value={form?.description}
              onChange={(input) => setForm(prev => ({
                ...prev,
                description: input.target.value
              }))}
              fullWidth
              label="نشانی"
              rows={5}
              multiline={true}
              variant="outlined"
              className="textInput"
              required
              onInvalid={(e) => {
                // @ts-ignore
                document.getElementById('desc-textfield').setCustomValidity('لطفا جزئیات آدرس را وارد کنید');
              }}
              id="desc-textfield"
            />
            <div className="addressManageRow">
              <TextField
                size="small"
                value={form?.pelak}
                onChange={(input) => setForm(prev => ({
                  ...prev,
                  pelak: input.target.value
                }))}
                label="پلاک"
                variant="outlined"
                className="textInput half"
                required
                onInvalid={(e) => {
                  // @ts-ignore
                  document.getElementById('pelak-textfield').setCustomValidity('لطفا پلاک را وارد کنید');
                }}
                id="pelak-textfield"
              />
              <TextField
                // helperText={!form.vahed && 'لطفا واحد را وارد کنید'}
                onInvalid={(e) => {
                  // @ts-ignore
                  document.getElementById('vahed-textfield').setCustomValidity('لطفا واحد را وارد کنید');
                }}
                id="vahed-textfield"
                onError={(e) => console.log(e)}
                size="small"
                value={form?.vahed}
                label="واحد"
                onChange={(input) => setForm(prev => ({
                  ...prev,
                  vahed: input.target.value
                }))}
                variant="outlined"
                className="textInput half"
                required

              /><TextField
                // helperText={!form.vahed && 'لطفا واحد را وارد کنید'}
                onInvalid={(e) => {
                  // @ts-ignore
                  document.getElementById('vahed-textfield').setCustomValidity('لطفا واحد را وارد کنید');
                }}
                id="vahed-textfield"
                onError={(e) => console.log(e)}
                size="small"
                value={form?.floor}
                label="طبقه"
                onChange={(input) => setForm(prev => ({
                  ...prev,
                  floor: input.target.value
                }))}
                variant="outlined"
                className="textInput half"
                required

              />
            </div>
          </section>
        }
        <button className="confirmButton addressManageButton" type="button" onClick={submit}>
          ثبت
        </button>
      </form>
    </>
  );
};

export default AddressManage;
