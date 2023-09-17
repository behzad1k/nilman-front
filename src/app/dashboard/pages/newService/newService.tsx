import {useState} from 'react';
import {Box, Button, Typography} from '@mui/material';
import {useForm, FieldValues} from 'react-hook-form';
import {TextInput, SelectInput} from '../../../../components';
import {api} from '../../../../services/http';
import {urls} from '../../../../services/endPoint';
import {useAppSelector} from '../../../../services/redux/store';
import {MenuItem} from '@mui/material';

export default function NewService() {
  const {register, handleSubmit, control, getValues} = useForm();
  const services = useAppSelector((state) => state.serviceReducer.services);

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const reqOptions = {
      method: 'post',
      body: {
        title: data.title,
        section: data.section,
        description: data.description,
        price: Number(data.price),
        parent: data.parent,
      },
    };
    const res = await api(urls.adminService, reqOptions, true);
    console.log(res);
  };
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
          name="parent"
          label="دسته بندی اصلی"
          control={control}
          defaultValue=""
          size="medium"
        >
          {services.map((service) => (
            <MenuItem key={service.slug} value={service.slug}>
              {service.title}
            </MenuItem>
          ))}
        </SelectInput>
        <TextInput
          name="title"
          label="عنوان"
          control={control}
          defaultValue=""
          size="medium"
        />
        <TextInput
          name="section"
          label="سانس انجام"
          control={control}
          defaultValue=""
          size="medium"
        />
        <TextInput
          name="description"
          label="توضیحات"
          control={control}
          defaultValue=""
          size="medium"
        />
        <TextInput
          name="price"
          label="قیمت"
          control={control}
          defaultValue=""
          size="medium"
        />
        <Box display="flex" flexDirection="column" gap={1}>
          <Button
            variant="contained"
            color="success"
            type="submit"
            fullWidth
            size="large"
          >
            افزودن
          </Button>
          <Button variant="outlined" color="error" type="reset" fullWidth size="large">
            بیخیال
          </Button>
        </Box>
      </Box>
    </>
  );
}
