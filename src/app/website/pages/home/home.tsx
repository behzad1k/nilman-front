import { InstagramLogo, Percent, Phone, MapPin, PlusCircle } from '@phosphor-icons/react';
import {ContactPhone, WhatsApp} from '@mui/icons-material';
import React, { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {initialApis} from '../../../../services/apis/global';
import { useAppDispatch, useAppSelector } from '../../../../services/redux/store';
import {ISliderCardInfo} from '../../../../services/types';
import {Slider} from '../../../../components';
import {BannerCard} from '../../../../components';
import {Box, Stack, Typography} from '@mui/material';
import WorkerDashboard from './WorkerDashboard';

export default function Home() {
  const userReducer = useAppSelector((state) => state.userReducer);
  const services = useAppSelector(state => state.serviceReducer.services)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const sliderList = () => {
    const rows: ReactElement[] = []

    const childExtractor = (arr, item, org) => {
      if (!Array.isArray(arr[org])){
        arr[org] = []
      }
      if (item.media) {
        arr[org].push(item.media);
      }
      if (item.attributes){
        item.attributes.map(e => childExtractor(arr, e, org))
      }
    }

    const rawArr = {};

    services?.map(e => childExtractor(rawArr, e, e.title))


    Object.entries(rawArr).filter(([key, value]) => (value as any)?.length > 0).map(([key,value]: [key: string, value: any], index) => rows.push(<Slider title={key} cardInfos={value} />))

    return rows;
  };

  return (
    <main className='homeMain'>
      <section className="banners">
        {/* linear-gradient(282deg, rgb(255, 135, 177), rgba(255, 163, 195, 0.2)); */}
        {/* <article className='bannerCardColumned'> */}
        {/*   <div> */}
        {/*     <h3></h3> */}
        {/*   </div> */}
        {/* </article> */}
        <BannerCard
          bgColor1={'rgb(234, 99, 146)'}
          bgColor2={'rgba(255, 163, 195, 0.2)'}
          // bgColor1={'rgb(255, 135, 177)'}
          // bgColor2={'rgb(172, 172, 172)'}
          title={'ثبت سفارش عادی'}
          description={'همین حالا سفارش خود را ثبت کنید!'}
          button={'ثبت'}
          icon={<PlusCircle />}
          onClick={() => {
            navigate('/')
          }}
        />
      </section>
      <section className="banners">
        {/* linear-gradient(282deg, rgb(255, 135, 177), rgba(255, 163, 195, 0.2)); */}
        {/* <article className='bannerCardColumned'> */}
        {/*   <div> */}
        {/*     <h3></h3> */}
        {/*   </div> */}
        {/* </article> */}
        <BannerCard
          bgColor1="rgb(122, 173, 253)"
          bgColor2="rgb(216, 228, 234)"
          // bgColor1={'rgb(255, 135, 177)'}
          // bgColor2={'rgb(172, 172, 172)'}
          title={'ثبت سفارش فوری'}
          description={'برای سفارشات فوری از دو ساعت آینده(با افزایش هزینه همراه می باشد!)'}
          button={'ثبت سفارش فوری'}
          icon={<PlusCircle />}
          onClick={() => {
            navigate('/?isUrgent=')
          }}
        />
      </section>
      <section>
        {/* <div className="resumeText"> */}
        {/*   <h2>خدمات</h2> */}
        {/*   <p> */}
        {/*     {' '} */}
        {/*     با مشاهده نمونه کار‌ها می‌توانید آرایشگران و نمونه کار‌های محبوب خود را انتخاب */}
        {/*     کنید.{' '} */}
        {/*   </p> */}
        {/* </div> */}
        {sliderList()}
        {/* <Slider title={'خدمات ناخن'} cardInfos={cardInfos1} /> */}
        {/* <Slider title={'خدمات مو'} cardInfos={cardInfos2} /> */}
        {/* <Slider title={'خدمات ابرو'} cardInfos={cardInfos3} /> */}
        {/* <Slider title={'خدمات مژه'} cardInfos={cardInfos4} /> */}
      </section>
      <section className="banners">
        <BannerCard
          title={'مناطق سرویس‌دهی'}
          description={'مناطق ۱ تا ۸'}
          button={'مشاهده'}
          icon={<Percent />}
          bgColor1={'rgb(234, 99, 146)'}
          bgColor2={'rgba(255, 163, 195, 0.2)'}

        />
      </section>
      <Box component="section" className="banners contact-us" mt={2.5}>
        <Box display="flex" gap={2} alignItems="center">
          <ContactPhone className="section-logo" />
          <Typography variant="h6" fontWeight={300}>
            ارتباط با ما
          </Typography>
        </Box>
        <span className="banner-row">
          <Phone />
          شماره تماس : <a className="dirLtr" href="tel:02122753005">۰۲۱۲۲۷۵۳۰۰۵ - ۶</a>
        </span>
        <span className="banner-row">
          <MapPin />
          <span>آدرس : تهران - زعفرانیه - خیابان مقدس اردبیلی - پلاک ۳۱ - طبقه ۶</span>
        </span>
        <div className="banner-row">
          <a className="whatsapp-btn" href="https://wa.me/09351007201">
            <WhatsApp />
            <span>واتس اپ</span>
          </a>
          <a className="whatsapp-btn" href="instagram://user?username=nilmanbeauty">
            <InstagramLogo width={25} height={25} />
            <span>اینستاگرام</span>
          </a>
        </div>
      </Box>
    </main>
  );
}
