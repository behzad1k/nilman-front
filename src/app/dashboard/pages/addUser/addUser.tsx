import {Box, Typography, Container, Button} from '@mui/material';
import {TextInput, SelectInput} from '../../../../components';
import {useForm, FieldValues, Controller} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {api} from '../../../../services/http';
import {urls} from '../../../../services/endPoint';
import {IService} from '../../../../services/types';
import {MenuItem} from '@mui/material';
import {MuiFileInput} from 'mui-file-input';

export default function AddUser() {
  const {register, handleSubmit, control, getValues} = useForm();
  const [role, setRole] = useState('');
  const [services, setServices] = useState([]);
  const roleOptions = [
    {
      slug: 'USER',
      value: 'کاربر عادی',
    },
    {
      slug: 'WORKER',
      value: 'آرایشگر',
    },
    {
      slug: 'OPERATOR',
      value: 'اپراتور',
    },
    {
      slug: 'SUPER_ADMIN',
      value: 'ادمین',
    },
  ];

  const onSubmit = async (data: FieldValues) => {
    const reqOptions = {
      method: 'post',
      body: {
        ...data,
      },
    };
    console.log(reqOptions);
    const res = await api(urls.adminUser, reqOptions, true);
    console.log(res);
  };

  useEffect(() => {
    const getServices = async () => {
      const res = await api(urls.services);
      console.log(res);

      setServices(res.data);
    };
    getServices();
  }, []);

  return (
    <>
      <Typography variant="h5" component="h1">
        افزودن کاربر جدید
      </Typography>
      <Box
        component="form"
        sx={{display: 'flex', flexDirection: 'column', gap: 3}}
        onSubmit={handleSubmit(onSubmit)}
      >
        <SelectInput
          name="role"
          label="نقش کاربر"
          control={control}
          defaultValue=""
          size="medium"
          customOnChange={(e) => setRole(e.target.value)}
        >
          {roleOptions.map((role) => (
            <MenuItem key={role.slug} value={role.slug}>
              {role.value}
            </MenuItem>
          ))}
        </SelectInput>
        {role === 'WORKER' && (
          <>
            <SelectInput
              name="service"
              label="نوع خدمت"
              control={control}
              defaultValue=""
              size="medium"
            >
              {services.map((service: IService) => (
                <MenuItem key={service.slug} value={service.slug}>
                  {service.title}
                </MenuItem>
              ))}
            </SelectInput>
            <SelectInput
              name="district"
              label="منطقه"
              control={control}
              defaultValue=""
              size="medium"
            >
              <MenuItem value={1}>منطقه ۱</MenuItem>
              <MenuItem value={2}>منطقه ۲</MenuItem>
              <MenuItem value={3}>منطقه ۳</MenuItem>
            </SelectInput>
          </>
        )}
        {role !== '' && role !== 'WORKER' && role !== 'USER' && (
          <>
                  <TextInput
                  name="username"
                  label="نام کاربری"
                  control={control}
                  defaultValue=""
                  size="medium"
                />
                <TextInput
                  name="password"
                  label="رمز عبور"
                  control={control}
                  defaultValue=""
                  size="medium"
                  type='password'
                />
          </>
        )}
        <TextInput
          name="name"
          label="نام"
          control={control}
          defaultValue=""
          size="medium"
        />
        <TextInput
          name="lastName"
          label="نام خانوادگی"
          control={control}
          defaultValue=""
          size="medium"
        />
        <TextInput
          name="nationalCode"
          label="شماره ملی"
          control={control}
          defaultValue=""
          size="medium"
        />
        <TextInput
          name="phoneNumber"
          label="تلفن همراه"
          control={control}
          defaultValue=""
          size="medium"
        />
        <Controller
          control={control}
          name="profilePicture"
          render={({field}) => {
            return <MuiFileInput {...field} label="عکس پروفایل" size="medium" />;
          }}
        />
        <Button variant="contained" color="success" type="submit" size="large" fullWidth>
          افزودن
        </Button>
      </Box>
    </>
  );
}
