import {useState} from 'react';

import Modal from '../../components/modal';
import OrdersTable from '../../components/OrdersTable';
import OrdersModalContent from '../../components/OrdersModalContent';

import {Typography, Paper, Tab, Tabs} from '@mui/material';

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

// ? Creates dummy data
function createData(
  registrationDate: string,
  requestedService: string,
  fullName: string,
  phoneNumber: string,
  executionDate: string,
  executionTime: string,
  address: string,
  status: string,
  handler: string,
): Data {
  return {
    registrationDate,
    requestedService,
    fullName,
    phoneNumber,
    executionDate,
    executionTime,
    address,
    status,
    handler,
  };
}

const rows = [
  createData(
    '۱۴۰۲/۰۵/۲۴',
    'ناخن',
    'آیدا جلیلی',
    '۰۹۰۲۱۱۳۴۶۸۷',
    '۱۴۰۲/۰۶/۰۴',
    '۸ تا ۱۰',
    'خوزستان، اهواز، بلوار ساحلی غربی',
    'بررسی نشده',
    'محول نشده',
  ),
  createData(
    '۱۴۰۲/۰۴/۱۲',
    'مو',
    'مولود علوی',
    '۰۹۱۳۸۹۱۷۵۴۳',
    '۱۴۰۲/۰۴/۱۴',
    '۱۲ تا ۱۶',
    'خوزستان، آبادان، امیرآباد',
    'در حال اجرا',
    'نصرت سلطانی',
  ),
  createData(
    '۱۴۰۲/۰۵/۲۴',
    'ناخن',
    'آیدا جلیلی',
    '۰۹۰۲۱۱۳۴۶۸۷',
    '۱۴۰۲/۰۶/۰۴',
    '۸ تا ۱۰',
    'خوزستان، اهواز، بلوار ساحلی غربی',
    'در حال اجرا',
    'نصرت سلطانی',
  ),
  createData(
    '۱۴۰۲/۰۴/۱۲',
    'مو',
    'مولود علوی',
    '۰۹۱۳۸۹۱۷۵۴۳',
    '۱۴۰۲/۰۴/۱۴',
    '۱۲ تا ۱۶',
    'خوزستان، آبادان، امیرآباد',
    'انجام شده',
    'محترم محمود زاده',
  ),
  createData(
    '۱۴۰۲/۰۵/۲۴',
    'ناخن',
    'آیدا جلیلی',
    '۰۹۰۲۱۱۳۴۶۸۷',
    '۱۴۰۲/۰۶/۰۴',
    '۸ تا ۱۰',
    'خوزستان، اهواز، بلوار ساحلی غربی',
    'انجام شده',
    'محترم محمود زاده',
  ),
  createData(
    '۱۴۰۲/۰۴/۱۲',
    'مو',
    'مولود علوی',
    '۰۹۱۳۸۹۱۷۵۴۳',
    '۱۴۰۲/۰۴/۱۴',
    '۱۲ تا ۱۶',
    'خوزستان، آبادان، امیرآباد',
    'بررسی نشده',
    'محول نشده',
  ),
  createData(
    '۱۴۰۲/۰۵/۲۴',
    'ناخن',
    'آیدا جلیلی',
    '۰۹۰۲۱۱۳۴۶۸۷',
    '۱۴۰۲/۰۶/۰۴',
    '۸ تا ۱۰',
    'خوزستان، اهواز، بلوار ساحلی غربی',
    'بررسی نشده',
    'محول نشده',
  ),
  createData(
    '۱۴۰۲/۰۴/۱۲',
    'مو',
    'مولود علوی',
    '۰۹۱۳۸۹۱۷۵۴۳',
    '۱۴۰۲/۰۴/۱۴',
    '۱۲ تا ۱۶',
    'خوزستان، آبادان، امیرآباد',
    'بررسی نشده',
    'محول نشده',
  ),
  createData(
    '۱۴۰۲/۰۵/۲۴',
    'ناخن',
    'آیدا جلیلی',
    '۰۹۰۲۱۱۳۴۶۸۷',
    '۱۴۰۲/۰۶/۰۴',
    '۸ تا ۱۰',
    'خوزستان، اهواز، بلوار ساحلی غربی',
    'بررسی نشده',
    'محول نشده',
  ),
  createData(
    '۱۴۰۲/۰۴/۱۲',
    'مو',
    'مولود علوی',
    '۰۹۱۳۸۹۱۷۵۴۳',
    '۱۴۰۲/۰۴/۱۴',
    '۱۲ تا ۱۶',
    'خوزستان، آبادان، امیرآباد',
    'بررسی نشده',
    'محول نشده',
  ),
  createData(
    '۱۴۰۲/۰۵/۲۴',
    'ناخن',
    'آیدا جلیلی',
    '۰۹۰۲۱۱۳۴۶۸۷',
    '۱۴۰۲/۰۶/۰۴',
    '۸ تا ۱۰',
    'خوزستان، اهواز، بلوار ساحلی غربی',
    'بررسی نشده',
    'محول نشده',
  ),
  createData(
    '۱۴۰۲/۰۴/۱۲',
    'مو',
    'مولود علوی',
    '۰۹۱۳۸۹۱۷۵۴۳',
    '۱۴۰۲/۰۴/۱۴',
    '۱۲ تا ۱۶',
    'خوزستان، آبادان، امیرآباد',
    'بررسی نشده',
    'محول نشده',
  ),
];

// ? TODO: Change show type to work based on english values, currently it does not match with dummy data.
type ShowType = 'همه' | 'بررسی نشده' | 'در حال اجرا' | 'انجام شده';

export default function Orders() {
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<null | Data>(null);
  const [showType, setShowType] = useState<ShowType>('همه');

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Typography variant="h5" component="h1">
        سفارش ها
      </Typography>

      <Paper sx={{width: '100%', overflow: 'hidden'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          variant="fullWidth"
          sx={{
            '& .Mui-selected': {backgroundColor: '#fff'},
          }}
        >
          <Tab onClick={() => setShowType('همه')} label="همه" />
          <Tab onClick={() => setShowType('بررسی نشده')} label="بررسی نشده" />
          <Tab onClick={() => setShowType('در حال اجرا')} label="در حال اجرا" />
          <Tab onClick={() => setShowType('انجام شده')} label="انجام شده" />
        </Tabs>
        <OrdersTable
          rows={showType === 'همه' ? rows : rows.filter((row) => row.status === showType)}
          setOpenModal={setOpenModal}
          setEditData={setEditData}
        />
      </Paper>
      <Modal open={openModal} setOpen={setOpenModal}>
        <OrdersModalContent
          editData={editData}
          setEditData={setEditData}
          setOpenModal={setOpenModal}
        />
      </Modal>
    </>
  );
}
