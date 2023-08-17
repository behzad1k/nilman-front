import SelectInput from './selectInput';

import {Box, Button, Typography} from '@mui/material';

import {useForm} from 'react-hook-form';

interface Data {
  registrationDate: string;
  requestedService: string;
  fullName: string;
  phoneNumber: string;
  executionDate: string;
  executionTime: string;
  address: string;
  status: string;
  handler: string;
}

type Props = {
  editData: Data | null;
  setEditData: (val: Data | null) => void;
  setOpenModal: (val: boolean) => void;
};

export default function OrdersModalContent({editData, setEditData, setOpenModal}: Props) {
  const {reset, handleSubmit, control} = useForm({
    values: editData || undefined,
  });

  const handleCloseEditModal = () => {
    setOpenModal(false);
    setEditData(null);
    reset();
  };

  const handleSubmitEditUser = (data: Data) => {
    console.log(data);
  };

  return (
    <>
      <Typography variant="h6" component="h2" marginBottom={6}>
        مدیریت سفارش
      </Typography>
      <Box
        component="form"
        sx={{display: 'flex', flexDirection: 'column', gap: 8}}
        onSubmit={handleSubmit(handleSubmitEditUser)}
      >
        <SelectInput
          name="handler"
          label="محول کردن به"
          control={control}
          defaultValue=""
          options={[
            {
              value: 'محول نشده',
            },
            {
              value: 'ملیکا اژدری',
            },
            {
              value: 'درسا توانا',
            },
          ]}
        />
        <Box display="flex" flexDirection="column" gap={1}>
          <Button variant="contained" color="success" type="submit" fullWidth>
            ثبت
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleCloseEditModal}
            fullWidth
          >
            بیخیال
          </Button>
        </Box>
      </Box>
    </>
  );
}
