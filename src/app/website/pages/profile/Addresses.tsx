import {useRef, useState} from 'react';
import {addresses} from '../../../../services/redux/reducers/userSlice.ts';
import {useAppDispatch, useAppSelector} from '../../../../services/redux/store.ts';
import {IAddress} from '../../../../services/types.ts';
import {AddressRow} from './addressRow.tsx';
import {Button, Typography, Box} from '@mui/material';
import {Modal, TextInput} from '../../../../components';
import {useForm, FieldValues} from 'react-hook-form';
import {api} from '../../../../services/http.ts';
import {urls} from '../../../../services/endPoint.ts';
import {Map} from '../../../../components';
import {PlusCircle} from '@phosphor-icons/react';
import {SET_LOADING} from '../../../../services/redux/reducers/loadingSlice.ts';

type Position = {
  lat: number;
  lng: number;
};

export const Addresses = ({onClick}: {onClick?: (address: IAddress) => void}) => {
  const [openModal, setOpenModal] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const userAddresses = useAppSelector((state) => state.userReducer.addresses);
  const {reset, handleSubmit, control} = useForm();
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<IAddress>();
  const handleSubmitAddAddress = async (data: FieldValues) => {
    const reqOptions = {
      method: 'post',
      body: {
        ...data,
        longitude: position?.lng.toString(),
        latitude: position?.lat.toString(),
      },
    };
    dispatch(SET_LOADING(true));
    const res = await api(urls.address, reqOptions, true);
    dispatch(addresses());
    dispatch(SET_LOADING(false));
    setOpenModal(false);
  };

  return (
    <section className="addressSection">
      {userAddresses.map((value: IAddress, index) => (
        <AddressRow
          isSelected={selected == value && onClick != undefined}
          address={value}
          key={index}
          setSelected={setSelected}
          onClick={onClick}
        />
      ))}
      <div className="addressContainer add" onClick={() => setOpenModal(true)}>
        <PlusCircle weight={'fill'} color="green" size={20} />
        <Button>افزودن آدرس</Button>
      </div>

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
          <Map position={position} setPosition={setPosition} />
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
