import {useEffect, useState} from 'react';
import {useAppSelector} from '../../../../services/redux/store';
import {FieldValues, useForm} from 'react-hook-form';
import {Box, Button, Paper, Typography} from '@mui/material';
import {Modal, SelectInput, TextInput} from '../../../../components';
import {IService} from '../../../../services/types';
import {urls} from '../../../../services/endPoint';
import {api} from '../../../../services/http';
import {MenuItem} from '@mui/material';

export default function Services() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<IService | null>(null);
  const [services, setServices] = useState<IService[]>([]);

  const {register, handleSubmit, control, getValues} = useForm({
    values: editData || undefined,
  });

  const handleClickEdit = (service: IService) => {
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
    const res = await api(urls.adminService, reqOptions, true);
    console.log(res);
  };

  const handleCloseModal = () => {
    setEditData(null);
    setOpen(false);
  };

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const reqOptions = {
      method: 'put',
      body: {...data, service: data.slug},
    };

    const res = await api(urls.adminService, reqOptions, true);
    console.log(res);
  };

  const fetchData = async () => {
    const res = await api(urls.adminService, {}, true);
    console.log(res.data);
    setServices(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log(services);
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
