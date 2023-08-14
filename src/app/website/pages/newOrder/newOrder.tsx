import React, { useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, Table } from "@mui/material";
import { Input } from "../../components";

export default function NewOrder(){

  const [hasAttributes, setHasAttribute] = useState(false);

  return(
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
                    borderRadius: '10px'
                  }
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
                    borderRadius: '10px'
                  }
                }}
                onChange={() => setHasAttribute(true)}
            >
              <MenuItem value={10}>ناخن</MenuItem>
              <MenuItem value={20}>رنگ مو</MenuItem>
              <MenuItem value={30}>ابرو</MenuItem>
            </Select>
          </FormControl>
          {hasAttributes &&
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
                          borderRadius: '10px'
                        }
                      }}
                      className="orderSelect"
                      // onChange={handleChange}
                  >
                      <MenuItem value={10}>لاک ژل</MenuItem>
                      <MenuItem value={20}>طرح دار</MenuItem>
                  </Select>
              </FormControl>
          }
          <div className="discount">
            <input placeholder="کد تخفیف" className="discountInput" />
            <Button className="discountButton">اعمال</Button>
          </div>
        </form>
        <div className="infoBox">
          <h3>فاکتور</h3>
          <table className="table">
            <tbody>
            <tr>
              <td>قیمت سرویس</td>
              <td> 300,000 تومان</td>
            </tr>
            <tr>
              <td>قیمت طرح دار</td>
              <td> 20,000 تومان</td>
            </tr>
            <tr>
              <td>ایاب ذهاب</td>
              <td> 90,000 تومان</td>
            </tr>
            <tr>
              <td>جمع کل</td>
              <td> 410,000 تومان</td>
            </tr>
            </tbody>
          </table>
        </div>
      </main>
  )
}