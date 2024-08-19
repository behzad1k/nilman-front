import { TextField } from '@mui/material';
import { Camera, PencilLine } from '@phosphor-icons/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TextInput } from '../../../../../components';
import { Header } from '../../../../../components/website/header.tsx';
import { urls } from '../../../../../services/endPoint.ts';
import { api } from '../../../../../services/http.ts';
import { SET_LOADING } from '../../../../../services/redux/reducers/loadingSlice.ts';
import { user } from '../../../../../services/redux/reducers/userSlice.ts';
import { useAppSelector } from '../../../../../services/redux/store.ts';

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userReducer = useAppSelector(state => state.userReducer.data)
  const [image, setImage] = useState({
    data: undefined,
    preview: undefined
  });
  const [form, setForm] = useState({
    name: userReducer.name,
    lastName: userReducer.lastName,
    nationalCode: userReducer.nationalCode,
    phoneNumber: userReducer.phoneNumber
  });

  const submit = async () => {
    dispatch(SET_LOADING(true));
    let res = null;
    // const res = await api(urls.getUser, { method: 'PUT', body: { name: form.name, lastName: form.lastName }}, true)
    if (image.data) {
      const formData = new FormData();
      formData.append('file', image.data);
      res = await axios(process.env.REACT_APP_BASE_URL + urls.userMedia, { method: 'POST', data: formData, headers: { Authorization: `Bearer ${Cookies.get('token')}`}});
    }
    if (res?.data?.code == 200){
      dispatch(user(res?.data?.data));

      toast('اطلاعات کابری با موفقیت بروزرسانی شد.', { type: 'success'})
      navigate('/profile')
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
          <img src={image.preview || userReducer.profilePic?.url || '/img/girl.png'} />
          <input id='inputImage' className="pfpButtons" hidden type='file' onChange={(input) => setImage(
            {
              data: input.target.files[0],
              preview: URL.createObjectURL(input.target.files[0]),
            }
          )}/>
          <label className="pfpButtons" htmlFor='inputImage'>
            <Camera className="camera" size={42} />
          </label>
        </span>
      </div>
      <TextField
        size="small"
        onChange={(input) => setForm(prev => ({ ...prev, name: input.target.value}))}
        value={form?.name}
        fullWidth
        disabled
        label='نام'
        variant="outlined"
        className='textInput'
        />
      <TextField
        size="small"
        onChange={(input) => setForm(prev => ({ ...prev, lastName: input.target.value}))}
        value={form?.lastName}
        fullWidth
        disabled
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
