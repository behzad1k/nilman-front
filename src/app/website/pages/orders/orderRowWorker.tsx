import {useState} from 'react';
import {Modal} from '../../../../components';
import {Article, Icon, Calendar, MapPinLine, Money, User} from '@phosphor-icons/react';
import {Box, Typography, Paper, Button} from '@mui/material';

const OrderItem = ({Icon, value}: {Icon: Icon; value: string}) => {
  return (
    <Box display="flex" alignItems="flex-start" gap={0.75}>
      <Icon size={20} />
      <Typography variant="subtitle1" fontWeight={300} component="p">
        {value}
      </Typography>
    </Box>
  );
};

export default function OrderRowWorker() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Paper
      elevation={3}
      component="article"
      sx={{
        width: '100%',
        bgcolor: 'var(--white-pink)',
      }}
    >
      <Box
        className="order-card-title"
        sx={{
          display: 'grid',
          placeItems: 'center',
          bgcolor: 'var(--light-pink)',
          height: '40px',
          m: '10px 14px 0 -14px',
        }}
      >
        <Typography variant="body1" component="h2">
          ناخن
        </Typography>
      </Box>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <OrderItem Icon={Article} value="لاک ژل" />
        <OrderItem Icon={Calendar} value="۱۴۰۲/۰۵/۰۱" />
        <OrderItem Icon={MapPinLine} value="فرمانیه، پاسداران، خیابان نارنجستان چهارم" />
        <OrderItem Icon={Money} value={Intl.NumberFormat().format(1200000)} />
        <OrderItem Icon={User} value="آیدا شهابی" />
        <Button
          variant="outlined"
          onClick={() => setOpenModal(true)}
          sx={{
            borderColor: 'var(--mid-pink)',
            color: 'var(--light-black)',
            mt: 1,
            ':hover': {bgcolor: 'var(--mid-pink)', borderColor: 'var(--mid-pink)'},
          }}
        >
          جزئیات
        </Button>
        <Box display="flex" gap={1}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: 'var(--light-pink)',
              color: 'var(--light-black)',
              ':hover': {bgcolor: 'var(--mid-pink)'},
            }}
          >
            پذیرفتن
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: 'var(--light-grey)',
              color: 'var(--light-black)',
              ':hover': {bgcolor: 'var(--mid-pink)'},
            }}
          >
            رد کردن
          </Button>
        </Box>
      </Box>
      <Modal open={openModal} setOpen={setOpenModal}>
        عکس و توضیحات
      </Modal>
    </Paper>
  );
}
