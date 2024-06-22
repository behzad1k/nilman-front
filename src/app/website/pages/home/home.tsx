import { InstagramLogo, Percent, Phone, MapPin, PlusCircle } from '@phosphor-icons/react';
import {ContactPhone, WhatsApp} from '@mui/icons-material';
import React, { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {initialApis} from '../../../../services/apis/global.ts';
import { useAppDispatch, useAppSelector } from '../../../../services/redux/store.ts';
import {ISliderCardInfo} from '../../../../services/types.ts';
import {Slider} from '../../../../components';
import {BannerCard} from '../../../../components';
import {Box, Stack, Typography} from '@mui/material';
import WorkerDashboard from './WorkerDashboard.tsx';

export default function Home() {
  const userReducer = useAppSelector((state) => state.userReducer);
  const services = useAppSelector(state => state.serviceReducer.services)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   initialApis(dispatch);
  // }, []);
  const cardInfos1: ISliderCardInfo[] = [
    {
      title: 'لاک ژل',
      imgSrc: '/img/img1.jpg',
    },
    {
      title: 'کاشت ناخن',
      imgSrc: '/img/img2.jpg',
    },
    {
      title: 'لاک معمولی',
      imgSrc: '/img/img3.jpg',
    },
    {
      title: 'لاک طرح دار',
      imgSrc: './img/img4.jpg',
    },
    {
      title: 'لاک ژل',
      imgSrc: './img/img5.jpg',
    },
    {
      title: 'لاک ژل',
      imgSrc: './img/img1.jpg',
    },
  ];
  const cardInfos2: ISliderCardInfo[] = [
    {
      title: 'رنگ مو طلایی',
      imgSrc: './img/hair1.jpg',
    },
    {
      title: 'هایلایت',
      imgSrc: './img/hair2.jpg',
    },
    {
      title: 'کراتین مو',
      imgSrc: './img/hair3.jpg',
    },
    {
      title: 'بافت مو',
      imgSrc: './img/hair4.jpg',
    },
    {
      title: 'رنگ مو قهوه ای',
      imgSrc: './img/hair5.jpg',
    },
    {
      title: 'رنگ مو صورتی',
      imgSrc: './img/hair6.jpg',
    },
  ];
  const cardInfos3: ISliderCardInfo[] = [
    {
      title: 'میکرو بلیدینگ ابرو',
      imgSrc: './img/eyebrows1.jpg',
    },
    {
      title: 'تتو ابرو',
      imgSrc: './img/eyebrows2.jpg',
    },
    {
      title: 'رنگ ابرو',
      imgSrc: './img/eyebrows3.jpg',
    },
    {
      title: 'اصلاح ابرو',
      imgSrc: './img/eyebrows4.jpg',
    },
    {
      title: 'لیفت ابرو',
      imgSrc: './img/eyebrows5.jpg',
    },
    {
      title: 'رنگ ابرو طلایی',
      imgSrc: './img/eyebrows6.jpg',
    },
  ];
  const cardInfos4: ISliderCardInfo[] = [
    {
      title: 'لمینت مژه',
      imgSrc: './img/eyelash1.jpg',
    },
    {
      title: 'اکستنشن مژه',
      imgSrc: './img/eyelash2.jpg',
    },
    {
      title: 'کاشت مژه',
      imgSrc: './img/eyelash3.jpg',
    },
  ];

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

  if (userReducer.data.role != 'USER'){
    return <WorkerDashboard />
  }

  return (
    <main>
      <section className="banners">
        <BannerCard
          title={'ثبت سفارش'}
          description={'همین حالا سفارش خود را ثبت کنید!'}
          button={'ثبت'}
          icon={<PlusCircle />}
          onClick={() => {
            if (userReducer.isLoggedIn) {
              navigate('/newOrder')
            } else {
              toast('لطفا ابتدا لاگین کنید', { type: 'warning', onClick: () => navigate('/login')});
              navigate('/login')
            }
          }}
        />
      </section>
      <section>
        <div className="resumeText">
          <h2>نمونه کار ها</h2>
          <p>
            {' '}
            با مشاهده نمونه کار‌ها می‌توانید آرایشگران و نمونه کار‌های محبوب خود را انتخاب
            کنید.{' '}
          </p>
        </div>
        {sliderList()}
        {/* <Slider title={'خدمات ناخن'} cardInfos={cardInfos1} /> */}
        {/* <Slider title={'خدمات مو'} cardInfos={cardInfos2} /> */}
        {/* <Slider title={'خدمات ابرو'} cardInfos={cardInfos3} /> */}
        {/* <Slider title={'خدمات مژه'} cardInfos={cardInfos4} /> */}
      </section>
      <section className="banners">
        <BannerCard
          title={'مناطق سرویس‌دهی'}
          description={'منطقه‌های ۱، ۲، ۳، ۴ و ۵'}
          button={'مشاهده'}
          icon={<Percent />}
          bgColor1="#FF0078"
          bgColor2="#F6EFA7"
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
          شماره تماس : <a href="tel:02133332563">۰۲۱۲۶۹۱۷۳۵۶-۷</a>
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
          <a className="whatsapp-btn" href="https://instagram.com/nilmanbeauty">
            <InstagramLogo width={25} height={25} />
            <span>اینستاگرام</span>
          </a>
        </div>
      </Box>
    </main>
  );
}
