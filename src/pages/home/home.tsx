import {motion} from 'framer-motion';
import Slider from "../../components/Slider/Slider.tsx";
import {BannerCard} from "../../components";
export function Home() {

    return (
        <motion.main
            initial={{translateX: '100%'}}
            animate={{translateX: 0}}
            exit={{translateX: '-100%'}}
            transition={{duration: 0.3}}
        >
            <section className="banners">
                <BannerCard
                    title={'اینستاگرام زیب'}
                    description={' برای مشاهده نمونه خدمات بیشتر به اینستاگرام زیب مراجعه کنید '}
                    button={'مشاهده'}
                    iconSrc={'/public/img/fav-icon.png'}/>
            </section>

            <section>
                <div className="resumeText">
                <h2>نمونه کار ها</h2>
                <p> با مشاهده نمونه کار‌ها می‌توانید آرایشگران و نمونه کار‌های محبوب خود را انتخاب کنید. </p>
                </div>
                <Slider title={'نمونه کار خدمات ناخن'}/>
                <Slider title={'نمونه کار خدمات زیبایی'}/>
                <Slider title={'نمونه کار آرایشی'}/>
            </section>
        </motion.main>
    );
}
