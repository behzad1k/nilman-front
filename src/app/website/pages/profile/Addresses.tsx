import {useState} from 'react';
import { useAppSelector } from "../../../../services/redux/store.ts";
import { IAddress } from "../../../../services/types.ts";
import {AddressRow} from './addressRow.tsx';
import {Button, Typography, Box} from '@mui/material';
import {Modal, TextInput} from '../../../../components';
import {useForm, FieldValues} from 'react-hook-form';
import {api} from '../../../../services/http.ts';
import {urls} from '../../../../services/endPoint.ts';

export const Addresses = () => {
  const [openModal, setOpenModal] = useState(false);
  const addresses = useAppSelector(state => state.userReducer.addresses)
  const {reset, handleSubmit, control} = useForm();

  const handleSubmitAddAddress = async (data: FieldValues) => {
    const reqOptions = {
      method: 'post',
      body: {
        ...data,
        longitude: '20',
        latitude: '20',
      },
    };
    const res = await api(urls.address, reqOptions, true);
    console.log(res);
  };

  return (
    <section className="addressSection">
      {addresses.map((value: IAddress, index) => <AddressRow address={value} key={index} />)}
      <Button onClick={() => setOpenModal(true)}>افزودن آدرس</Button>
      <Modal open={openModal} setOpen={setOpenModal}>
        <Typography variant="h6" component="h2" marginBottom={4}>
          افزودن آدرس
        </Typography>
        <Box
          component="form"
          sx={{display: 'flex', flexDirection: 'column', gap: 3}}
          onSubmit={handleSubmit(handleSubmitAddAddress)}
        >
          <TextInput name="title" label="عنوان آدرس" control={control} defaultValue="" />
          <TextInput
            name="phoneNumber"
            label="تلفن ثابت"
            control={control}
            defaultValue=""
            type="number"
          />
          <TextInput name="description" label="آدرس" control={control} defaultValue="" />
          <Box display="flex" flexDirection="column" gap={1}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              افزودن
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpenModal(false)}
              fullWidth
            >
              بیخیال
            </Button>
          </Box>
        </Box>
      </Modal>
    </section>
  );
};
