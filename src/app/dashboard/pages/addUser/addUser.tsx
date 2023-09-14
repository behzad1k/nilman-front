import {Box, Typography, Container, Button} from '@mui/material';
import {TextInput, SelectInput} from '../../../../components';
import {useForm, FieldValues} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {api} from '../../../../services/http';
import {urls} from '../../../../services/endPoint';
import {IService} from '../../../../services/types';

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
    console.log(data);
    const reqOptions = {
      method: 'post',
      body: {
        ...data,
      },
    };
    const res = await api(urls.adminUser, reqOptions, true);
    console.log(res);
  };

  useEffect(() => {
    const getServices = async () => {
      const res = await api(urls.services);
      console.log(res);

      setServices(
        res.data.map((service: IService) => {
          const {title: value, slug} = service;
          return {value, slug};
        }),
      );
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
          options={roleOptions}
          size="medium"
          customOnChange={(e) => setRole(e.target.value)}
        />
        {role === 'WORKER' && (
          <SelectInput
            name="service"
            label="نوع خدمت"
            control={control}
            defaultValue=""
            options={services}
            size="medium"
          />
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
        <Button variant="contained" color="success" type="submit" size="large" fullWidth>
          افزودن
        </Button>
      </Box>
    </>
  );
}
