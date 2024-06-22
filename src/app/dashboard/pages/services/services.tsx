import axios from 'axios';
import Cookies from 'js-cookie';
import { MuiFileInput } from 'mui-file-input';
import {useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import {useAppSelector} from '../../../../services/redux/store';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import {Box, Button, Paper, Typography} from '@mui/material';
import {Modal, SelectInput, TextInput} from '../../../../components';
import {IService} from '../../../../services/types';
import {urls} from '../../../../services/endPoint';
import {api} from '../../../../services/http';
import {MenuItem} from '@mui/material';

export default function Services() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<any>({});
  const [editData, setEditData] = useState<IService | null>(null);
  const [services, setServices] = useState<IService[]>([]);

  const {register, handleSubmit, control, getValues} = useForm({
    values:
      {
        ...editData,
        parent: editData?.parent?.slug,
        hasColor: editData?.hasColor ? 1 : 0,
      } || undefined,
  });

  const handleClickEdit = (service: IService) => {
    console.log('edit data', service);

    setEditData(service);
    setOpen(true);
  };

  const handleDeleteService = async (service: IService) => {
    const reqOptions = {
      method: 'delete',
      body: {
        service: service.slug,
      },
    };
    if (confirm('آیا مطمئن هستید؟')) {
      const res = await api(urls.adminService, reqOptions, true);
      if (res.code == 200){
        Swal.fire({
          title: 'موفق',
          text: `خدمت جدید با موفقیت حذف شد.`,
          icon: 'success',
          confirmButtonText: 'متوجه شدم',
        })
      } else {
        Swal.fire({
          title: 'ناموفق',
          text: res.data,
          icon: 'error',
          confirmButtonText: 'متوجه شدم'
        })
      }
    }
  };

  const handleCloseModal = () => {
    setEditData(null);
    setOpen(false);
  };

  const onSubmit = async (data: FieldValues) => {

    const formData = new FormData();
    Object.entries({
      title: data.title,
      section: data.section,
      description: data.description,
      price: Number(data.price),
      parent: data.parent,
      hasColor: Boolean(data.hasColor),
      service: data.slug,
    }).map(([key, value]) => formData.set(key, value));
    formData.append('file', image.data)

    const res = await axios(process.env.REACT_APP_BASE_URL + urls.adminService + editData.id, { method: 'POST', data: formData, headers: { Authorization: `Bearer ${Cookies.get('token')}`}});

    if (res.data?.code == 200){
      setOpen(false);
      Swal.fire({
        title: 'موفق',
        text: `خدمت جدید با موفقیت ویرایش شد.`,
        icon: 'success',
        confirmButtonText: 'متوجه شدم',
      })
    } else {
      Swal.fire({
        title: 'ناموفق',
        text: res.data?.data,
        icon: 'error',
        confirmButtonText: 'متوجه شدم'
      })
    }
    setEditData(null);

  };

  const fetchData = async () => {
    const res = await api(urls.adminService, {}, true);
    setServices(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2}}>
      {services.map((service) => (
        <Paper sx={{px: 1, py: 1.5, display: 'flex', flexDirection: 'column', gap: 3}}>
          <Typography variant="body1" component="h2">
            {service.title}
          </Typography>
          <Box sx={{display: 'flex', flexDirection: 'column', gap: 0.5}}>
            <Button
              variant="outlined"
              size="medium"
              onClick={() => handleClickEdit(service)}
            >
              ویرایش
            </Button>
            <Button
              variant="contained"
              color="error"
              size="medium"
              onClick={() => handleDeleteService(service)}
            >
              حذف
            </Button>
          </Box>
        </Paper>
      ))}
      <Modal open={open} setOpen={setOpen}>
        {editData && (
          <Box
            component="form"
            sx={{display: 'flex', flexDirection: 'column', gap: 3}}
            onSubmit={handleSubmit(onSubmit)}
          >
            <SelectInput
              name="parent"
              label="دسته بندی اصلی"
              control={control}
              defaultValue={editData.parent?.slug || ''}
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
              defaultValue={editData.title}
              size="medium"
            />
            <SelectInput
              name="hasColor"
              label="انتخاب رنگ"
              control={control}
              defaultValue={editData.hasColor ? 1 : 0}
              size="medium"
            >
              <MenuItem value={0}>غیر فعال</MenuItem>
              <MenuItem value={1}>فعال</MenuItem>
            </SelectInput>
            <TextInput
              name="section"
              label="سانس انجام"
              control={control}
              defaultValue={editData.section}
              size="medium"
            />
            <TextInput
              name="description"
              label="توضیحات"
              control={control}
              defaultValue={editData.description}
              size="medium"
            />
            <TextInput
              name="price"
              label="قیمت"
              control={control}
              defaultValue={editData.price}
              size="medium"
            />
            <Controller
              control={control}
              name="media"
              render={({field}) => {
                return <MuiFileInput {...field} label="نمونه کار" size="medium" onChange={(input) => setImage({
                  data: input,
                  preview: URL.createObjectURL(input),
                })}/>;
              }}
            />
            <img src={image.preview} />
            <Box display="flex" flexDirection="column" gap={1}>
              <Button
                variant="contained"
                color="success"
                type="submit"
                fullWidth
                size="large"
              >
                ویرایش
              </Button>
              <Button
                variant="outlined"
                color="error"
                type="reset"
                fullWidth
                size="large"
                onClick={handleCloseModal}
              >
                بیخیال
              </Button>
            </Box>
          </Box>
        )}
      </Modal>
    </Box>
  );
}
