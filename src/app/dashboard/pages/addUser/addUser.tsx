import {Box, Typography, Container, Button} from '@mui/material';
import {TextInput, SelectInput} from '../../../../components';
import {useForm, FieldValues} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {api} from '../../../../services/http';
import {urls} from '../../../../services/endPoint';

export default function AddUser() {
  const {register, handleSubmit, control, getValues} = useForm();

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
  ];

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const reqOptions = {
      method: 'post',
      body: data,
    };
    const res = await api(urls.register, reqOptions, true);
    console.log(res);
  };

  useEffect(() => {
    console.log(getValues().role);
  }, [getValues().role]);

  return (
    <>
      <Typography variant="h5" component="h1">
        افزودن خدمت جدید
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
          onSelect={(e) => console.log(e)}
        />
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
        <Button variant="contained" color="success" type="submit" fullWidth>
          افزودن
        </Button>
      </Box>
    </>
  );
}
