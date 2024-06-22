import { TextField } from '@mui/material';
import { PencilLine } from '@phosphor-icons/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TextInput } from '../../../../../components';
import { Header } from '../../../../../components/website/header.tsx';
import { urls } from '../../../../../services/endPoint.ts';
import { api } from '../../../../../services/http.ts';
import { SET_LOADING } from '../../../../../services/redux/reducers/loadingSlice.ts';
import { useAppSelector } from '../../../../../services/redux/store.ts';

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userReducer = useAppSelector(state => state.userReducer.data)
  const [form, setForm] = useState({
    name: userReducer.name,
    lastName: userReducer.lastName,
    nationalCode: userReducer.nationalCode,
    phoneNumber: userReducer.phoneNumber
  });

  const submit = async () => {
    dispatch(SET_LOADING(true));

    const res = await api(urls.getUser, { method: 'PUT', body: { name: form.name, lastName: form.lastName }}, true)

    if (res.code == 200){
      toast('اطلاعات کابری با موفقیت بروزرسانی شد.', { type: 'success'})
    }else{
      toast('مشکلی پیش آمده، لطفا مجددا امتحان کنید یا با اپراتور تماس بگیرید', { type: 'error'})
    }

    dispatch(SET_LOADING(false));
  };

  return (
    <>
      <Header onBack={() => navigate('/profile')} />
      <main className='editProfile'>
      <h3>ویرایش اطلاعات کاربری</h3>
      <div className="profileEditPic">
        <span className="profilePicture">
          <img src="/img/girl.png" />
          <span className="pfpButtons">
            <PencilLine className="edit" size={32} />
          </span>
        </span>
      </div>
      <TextField
        size="small"
        onChange={(input) => setForm(prev => ({ ...prev, name: input.target.value}))}
        value={form?.name}
        fullWidth
        label='نام'
        variant="outlined"
        className='textInput'
        />
      <TextField
        size="small"
        onChange={(input) => setForm(prev => ({ ...prev, lastName: input.target.value}))}
        value={form?.lastName}
        fullWidth
        label='نام خانوادگی'
        variant="outlined"
        className='textInput'
        />
      <TextField
        size="small"
        value={form?.nationalCode}
        fullWidth
        disabled={true}
        label='کد ملی'
        variant="outlined"
        className='textInput'
        />
      <TextField
        size="small"
        value={form?.phoneNumber}
        fullWidth
        disabled={true}
        label='شماره تماس'
        variant="outlined"
        className='textInput'
        />
        <button className='confirmButton' onClick={submit}>
          ثبت
        </button>
      </main>
    </>
  );
};

export default EditProfile;
