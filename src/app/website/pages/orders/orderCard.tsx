import {useState} from 'react';
import {Modal} from '../../../../components';
import {Article, Icon, Calendar, MapPinLine, Money, User} from '@phosphor-icons/react';
import {Box, Typography, Paper, Button} from '@mui/material';
import OrderItem from './orderItem';

type UserType = 'worker' | 'user';

export default function OrderCard() {
  const [openModal, setOpenModal] = useState(false);
  const [userType, setUserType] = useState<UserType>('user');

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
          m: '10px -14px 0 -14px',
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
            borderColor: 'var(--light-grey)',
            color: 'var(--light-black)',
            mt: 1,
            ':hover': {bgcolor: 'var(--mid-pink)', borderColor: 'var(--mid-pink)'},
          }}
        >
          جزئیات
        </Button>
        {userType === 'worker' && (
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
        )}
      </Box>
      <Modal open={openModal} setOpen={setOpenModal}>
        عکس و توضیحات
      </Modal>
    </Paper>
  );
}
