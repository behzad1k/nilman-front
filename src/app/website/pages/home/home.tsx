import {InstagramLogo, Percent} from '@phosphor-icons/react';
import {ISliderCardInfo} from '../../../../services/types.ts';
import {Slider} from '../../../../components';
import {BannerCard} from '../../../../components';

export default function Home() {
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
  return (
    <main>
      <section className="banners">
        <BannerCard
          title={'تخفیف تابستانی'}
          description={' برای مشاهده نمونه خدمات بیشتر به وبسایت نیلمان مراجعه کنید '}
          button={'مشاهده'}
          icon={<Percent />}
          bgColor1="rgb(253, 114, 114)"
          bgColor2="rgb(239, 79, 79)"
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
        <Slider title={'نمونه کار خدمات ناخن'} cardInfos={cardInfos1} />
        <Slider title={'نمونه کار خدمات مو'} cardInfos={cardInfos2} />
        <Slider title={'نمونه کار خدمات ابرو'} cardInfos={cardInfos3} />
      </section>
      <section className="banners">
        <BannerCard
          title={'اینستاگرام زیب'}
          description={' برای مشاهده نمونه خدمات بیشتر به اینستاگرام نیلمان مراجعه کنید '}
          button={'مشاهده'}
          icon={<InstagramLogo />}
        />
      </section>
    </main>
  );
}
