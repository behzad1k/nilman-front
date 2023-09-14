import {useState} from 'react';
import {Box, Button, Typography} from '@mui/material';
import {useForm, FieldValues} from 'react-hook-form';
import {TextInput, SelectInput} from '../../../../components';
import {api} from '../../../../services/http';
import {urls} from '../../../../services/endPoint';
import {useAppSelector} from '../../../../services/redux/store';

export default function NewService() {
  const [imgs, setImgs] = useState<any>(null);
  const {register, handleSubmit, control, getValues} = useForm();
  const services = useAppSelector((state) => state.serviceReducer.services);
  const options = services.map((service) => {
    const {title: value, slug} = service;
    return {value, slug};
  });
  console.log(options);

  // const onSubmit = (data: FieldValues) => {
  //   console.log(data);
  //   const formData = new FormData();
  //   formData.append('file', data.file[0]);
  // };

  // const onChangeImg = (e: any) => {
  //   setImgs(URL.createObjectURL(e.target.files[0]));
  // };

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
          options={options}
          size="medium"
        />
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
        {/* <Box display="flex" flexDirection="column" gap={1}>
          <label htmlFor="file">آپلود نمونه کار</label>
          <input id="file" type="file" {...register('file')} onChange={onChangeImg} />
        </Box> */}
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
