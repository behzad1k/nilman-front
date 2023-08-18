import React, {useEffect, useState} from 'react';
import {Button, FormControl, InputLabel, MenuItem, Select, Table} from '@mui/material';
import {formatPrice} from '../../../../utils/utils.ts';
import {Input} from '../../components';
// @ts-nocheck
// @ts-ignore
import moment from 'moment-jalali';
// @ts-ignore
import {DatePicker} from 'react-persian-datepicker';

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
  const [hasAttributes, setHasAttribute] = useState(false);
  const [date, setDate] = useState();
  const curDate = new Date();
  const minDate = curDate.setDate(curDate.getDate() - 1);
  const defaultDate = moment(new Date());

  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <main className="newOrderMain">
      <form className="orderForm">
        <h2>ثبت سفارش</h2>
        <FormControl>
          <InputLabel id="address">آدرس</InputLabel>
          <Select
            labelId="address"
            id="address"
            // value={age}
            label="آدرس"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--mid-pink)',
                backgroundColor: 'var(--white-pink)',
                borderRadius: '10px',
              },
            }}
            // onChange={handleChange}
          >
            <MenuItem value={10}>فرمانیه</MenuItem>
            <MenuItem value={20}>الهیه</MenuItem>
            <MenuItem value={30}>امیرآباد</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="service">خدمات زیبایی</InputLabel>
          <Select
            labelId="service"
            id="service"
            // value={age}
            label="خدمات زیبایی"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--mid-pink)',
                backgroundColor: 'var(--white-pink)',
                borderRadius: '10px',
              },
            }}
            onChange={() => setHasAttribute(true)}
          >
            <MenuItem value={10}>ناخن</MenuItem>
            <MenuItem value={20}>رنگ مو</MenuItem>
            <MenuItem value={30}>ابرو</MenuItem>
          </Select>
        </FormControl>
        {hasAttributes && (
          <FormControl>
            <InputLabel id="demo-simple-select-label">نوع ناخن</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="نوع ناخن"
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--mid-pink)',
                  backgroundColor: 'var(--white-pink)',
                  borderRadius: '10px',
                },
              }}
              className="orderSelect"
              // onChange={handleChange}
            >
              <MenuItem value={10}>لاک ژل</MenuItem>
              <MenuItem value={20}>طرح دار</MenuItem>
            </Select>
          </FormControl>
        )}
        <div className="discount">
          <input placeholder="کد تخفیف" className="discountInput" />
          <Button className="discountButton">اعمال</Button>
        </div>
        <div className="app-date-picker">
          <DatePicker
            value={date}
            min={minDate}
            calendarStyles={styles}
            // @ts-ignore
            onChange={(value) => setDate(value)}
            defaultValue={defaultDate}
          />
          <FormControl fullWidth>
            <InputLabel id="time">ساعت</InputLabel>
            <Select
              labelId="time"
              id="time"
              label="ساعت"
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--mid-pink)',
                  backgroundColor: 'var(--white-pink)',
                  borderRadius: '10px',
                },
              }}
            >
              <MenuItem value={10}>۸-۱۰</MenuItem>
              <MenuItem value={20}>۱۰-۱۲</MenuItem>
              <MenuItem value={30}>۱۲-۱۴</MenuItem>
              <MenuItem value={40}>۱۴-۱۶</MenuItem>
              <MenuItem value={50}>۱۶-۱۸</MenuItem>
            </Select>
          </FormControl>
        </div>
      </form>
      <div className="infoBox">
        <h3>فاکتور</h3>
        <table className="table">
          <tbody>
            <tr>
              <td>قیمت سرویس</td>
              <td> {formatPrice(300000)} تومان</td>
            </tr>
            <tr>
              <td>قیمت طرح دار</td>
              <td> {formatPrice(300000)} تومان</td>
            </tr>
            <tr>
              <td>ایاب ذهاب</td>
              <td> {formatPrice(300000)} تومان</td>
            </tr>
            <tr>
              <td>جمع کل</td>
              <td> {formatPrice(300000)} تومان</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
