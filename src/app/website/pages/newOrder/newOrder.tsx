// @ts-nocheck
import {useForm, FieldValues} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {Button, Box} from '@mui/material';
import {formatPrice} from '../../../../utils/utils.ts';
import moment from 'moment-jalali';
import {DatePicker} from 'react-persian-datepicker';
import {useAppSelector} from '../../../../services/redux/store.ts';
import {IService} from '../../../../services/types.ts';
import {TextInput, SelectInput} from '../../../../components';
import {api} from '../../../../services/http.ts';
import {urls} from '../../../../services/endPoint.ts';

const styles = {
  calendarContainer: 'calendarContainer',
  dayPickerContainer: 'dayPickerContainer',
  monthsList: 'monthsList',
  daysOfWeek: 'daysOfWeek',
  dayWrapper: 'dayWrapper',
  selected: 'selected',
  heading: 'heading',
  next: 'next',
  prev: 'prev',
  title: 'title',
};

export default function NewOrder() {
  const [serviceChildren, setServiceChildren] = useState<IService[] | null>(null);
  const [date, setDate] = useState();
  const curDate = new Date();
  const minDate = curDate.setDate(curDate.getDate() - 1);
  const defaultDate = moment(new Date());
  const services = useAppSelector((state) => state.serviceReducer.services);
  const addresses = useAppSelector((state) => state.userReducer.data.addresses);
  const servicesOptions = services.map((service) => {
    const {title: value, slug} = service;
    return {value, slug};
  });
  const addressOptions = addresses.map((address) => {
    const {id: slug, title: value} = address;
    return {slug, value};
  });

  const {register, handleSubmit, control, getValues, reset} = useForm();

  useEffect(() => {
    console.log(date);
  }, [date]);

  const onSelectService = (e) => {
    const children = services.filter((service) => service.slug === e.target.value)[0]
      .attributes;
    if (children.length) {
      setServiceChildren(
        children.map((child) => {
          const {slug, title: value} = child;
          return {slug, value};
        }),
      );
    } else setServiceChildren(null);
  };

  const timeOptions = [
    {
      slug: '8_10',
      value: '8 - 10',
    },
    {
      slug: '10_12',
      value: '10 - 12',
    },
    {
      slug: '12_14',
      value: '12 - 14',
    },
    {
      slug: '14_16',
      value: '14 - 16',
    },
    {
      slug: '16_18',
      value: '16 - 18',
    },
  ];

  const onSubmit = async (data: FieldValues) => {
    const reqOptions = {
      method: 'post',
      body: {
        ...data,
        date: Math.floor(new Date(date).getTime() / 1000),
      },
    };
    const res = await api(urls.order, reqOptions, true);
    console.log(res);
    if (res.code === 201) reset();
  };

  return (
    <main className="newOrderMain">
      <form className="orderForm" onSubmit={handleSubmit(onSubmit)}>
        <h2>ثبت سفارش</h2>
        <SelectInput
          name="addressId"
          label="آدرس"
          control={control}
          defaultValue=""
          options={addressOptions}
          size="medium"
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--mid-pink)',
              backgroundColor: 'var(--white-pink)',
              borderRadius: '10px',
            },
          }}
        />
        <SelectInput
          name="service"
          label="خدمات زیبایی"
          control={control}
          defaultValue=""
          customOnChange={onSelectService}
          options={servicesOptions}
          size="medium"
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--mid-pink)',
              backgroundColor: 'var(--white-pink)',
              borderRadius: '10px',
            },
          }}
        />
        {serviceChildren && (
          <SelectInput
            name="attribute"
            label="نوع"
            control={control}
            defaultValue=""
            options={serviceChildren}
            size="medium"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--mid-pink)',
                backgroundColor: 'var(--white-pink)',
                borderRadius: '10px',
              },
            }}
          />
        )}
        <Box sx={{display: 'flex', gap: 1}}>
          <TextInput
            name="discount"
            label="تخفیف"
            control={control}
            defaultValue=""
            size="medium"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--mid-pink)',
                backgroundColor: 'var(--white-pink)',
                borderRadius: '10px',
              },
            }}
          />
          <Button
            variant="contained"
            sx={{bgcolor: 'var(--mid-pink)', fontSize: 18, borderRadius: 2.5}}
          >
            اعمال
          </Button>
        </Box>
        <div className="app-date-picker">
          <DatePicker
            value={date}
            min={minDate}
            calendarStyles={styles}
            // @ts-ignore
            onChange={(value) => setDate(value)}
            defaultValue={defaultDate}
          />
          <SelectInput
            name="time"
            label="ساعت"
            control={control}
            defaultValue=""
            options={timeOptions}
            size="medium"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--mid-pink)',
                backgroundColor: 'var(--white-pink)',
                borderRadius: '10px',
              },
            }}
          />
        </div>
        <Button variant="contained" type="submit">
          ثبت
        </Button>
      </form>
      <div className="infoBox">
        <h3>فاکتور</h3>
        <table className="table">
          <tbody>
            <tr>
              <td>قیمت سرویس</td>
              <td> {formatPrice(230000)} تومان</td>
            </tr>
            <tr>
              <td>قیمت طرح دار</td>
              <td> {formatPrice(3200000)} تومان</td>
            </tr>
            <tr>
              <td>ایاب ذهاب</td>
              <td> {formatPrice(850000)} تومان</td>
            </tr>
            <tr>
              <td>جمع کل</td>
              <td> {formatPrice(1450000)} تومان</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
