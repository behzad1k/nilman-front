import {InstagramLogo, Percent, Phone, MapPin} from '@phosphor-icons/react';
import {ContactPhone} from '@mui/icons-material';
import React, {useEffect} from 'react';
import {initialApis} from '../../../../services/apis/global.ts';
import {useAppDispatch} from '../../../../services/redux/store.ts';
import {ISliderCardInfo} from '../../../../services/types.ts';
import {Slider} from '../../../../components';
import {BannerCard} from '../../../../components';
import {Box} from '@mui/material';

export default function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    initialApis(dispatch);
  }, []);
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
  return (
    <main>
      <section className="banners">
        <BannerCard
          title={'تخفیف تابستانی'}
          description={' برای مشاهده نمونه خدمات بیشتر به وبسایت نیلمان مراجعه کنید '}
          button={'مشاهده'}
          icon={<Percent />}
          bgColor1="#FF0078"
          bgColor2="#F6EFA7"
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
        <Slider title={'خدمات ناخن'} cardInfos={cardInfos1} />
        <Slider title={'خدمات مو'} cardInfos={cardInfos2} />
        <Slider title={'خدمات ابرو'} cardInfos={cardInfos3} />
        <Slider title={'خدمات مژه'} cardInfos={cardInfos4} />
      </section>
      <section className="banners">
        <BannerCard
          title={'اینستاگرام زیب'}
          description={' برای مشاهده نمونه خدمات بیشتر به اینستاگرام نیلمان مراجعه کنید '}
          button={'مشاهده'}
          icon={<InstagramLogo />}
        />
      </section>
      <Box component="section" className="banners" mt={2.5}>
        <BannerCard
          title="ارتباط با ما"
          icon={<ContactPhone />}
          bgColor1="rgb(255, 135, 177)"
          bgColor2="rgba(255, 163, 195, 0.2)"
        >
          <span className="banner-row">
            <Phone />
            شماره تماس : <a href="tel:02133332563">۰۲۱۳۳۳۳۲۵۶۳</a>
          </span>
          <span className="banner-row">
            <MapPin />
            <span>آدرس : تهران ...</span>
          </span>
        </BannerCard>
      </Box>
    </main>
  );
}
