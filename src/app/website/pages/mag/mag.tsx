import {Box, Typography, Drawer, Container, Paper, Stack} from '@mui/material';
import {theme} from '../../../../mui';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import nail from '../../../../assets/img/category-nail.png';
import eyebrow from '../../../../assets/img/category-eyebrow.png';
import hair from '../../../../assets/img/category-hair.png';
import {SwipeableDrawer} from '@mui/material';
import {useRef, useEffect} from 'react';

const categories = [
  {
    src: '../../../../assets/img/category-nail.png',
  },
];

export default function Mag() {
  const drawerEl = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = drawerEl.current;
    if (element) {
      element.style.height = element.scrollHeight + 50 + 'px';
    }
  }, [])

  return (
    <Box bgcolor="var(--mid-pink)">
      <Container component="section" sx={{py: 2}}>
        <Typography variant="h6" component="h1">
          مقالات و اخبار
        </Typography>
        <Typography variant="h6" fontWeight={300} component="h3" mb={1.5}>
          دسته بندی‌ ها
        </Typography>
        <Swiper
          spaceBetween={12}
          slidesPerView="auto"
          // loop={true}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          modules={[Autoplay]}
          autoplay
          centerInsufficientSlides
          className="categories-swiper"
        >
          <SwiperSlide>
            <img src={nail} alt="ناخن" />
            <Typography>ناخن</Typography>
          </SwiperSlide>
          <SwiperSlide>
            <img src={eyebrow} alt="ابرد" />
            <Typography>ابرو</Typography>
          </SwiperSlide>
          <SwiperSlide>
            <img src={hair} alt="مو" />
            <Typography>مو</Typography>
          </SwiperSlide>
          <SwiperSlide>
            <img src={nail} alt="ناخن" />
            <Typography>ناخن</Typography>
          </SwiperSlide>
          <SwiperSlide>
            <img src={hair} alt="مو" />
            <Typography>مو</Typography>
          </SwiperSlide>
        </Swiper>
      </Container>
      <Box
        minHeight="65vh"
        pt={8}
        pb={2}
        bgcolor="#fff"
        sx={{borderRadius: '40px 40px 0 0'}}
        component="section"
        ref={drawerEl}
      >
        <Container sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
          <Box sx={{display: 'flex', gap: 1}}>
            <Box
              component="img"
              sx={{
                width: 150,
                minWidth: 150,
                height: 150,
                borderRadius: '20px',
              }}
              src={nail}
            />
            <Box>
              <Typography
                lineHeight="normal"
                variant="subtitle2"
                fontWeight="800"
                component="h2"
                mb={0.5}
              >
                فواید پروتیین تراپی
              </Typography>
              <Typography mb={0.5} lineHeight="normal" variant="caption" component="p">
                پروسه پروتیین تراپی با تقویت و تغذیه تارهای مو تارهای آسیب دیده را ترمیم
                کرده و به درمان مشکل شکستگی خشکی و آسیب دیدگی مو کمک میکند این درمانها یک
                لایه محافظتی روی مو تشکیل میدهد.
              </Typography>
              <Stack flexDirection="row" justifyContent="space-between">
                <Typography lineHeight="normal" variant="caption" component="p">
                  نویسنده: لیلا شهابی
                </Typography>
                <Typography lineHeight="normal" variant="caption" component="time">
                  ۱۴۰۲/۰۵/۲۵
                </Typography>
              </Stack>
            </Box>
          </Box>
          <Box sx={{display: 'flex', gap: 1}}>
            <Box
              component="img"
              sx={{
                width: 150,
                minWidth: 150,
                height: 150,
                borderRadius: '20px',
              }}
              src={nail}
            />
            <Box>
              <Typography
                lineHeight="normal"
                variant="subtitle2"
                fontWeight="800"
                component="h2"
                mb={0.5}
              >
                فواید پروتیین تراپی
              </Typography>
              <Typography mb={0.5} lineHeight="normal" variant="caption" component="p">
                پروسه پروتیین تراپی با تقویت و تغذیه تارهای مو تارهای آسیب دیده را ترمیم
                کرده و به درمان مشکل شکستگی خشکی و آسیب دیدگی مو کمک میکند این درمانها یک
                لایه محافظتی روی مو تشکیل میدهد.
              </Typography>
              <Stack flexDirection="row" justifyContent="space-between">
                <Typography lineHeight="normal" variant="caption" component="p">
                  نویسنده: لیلا شهابی
                </Typography>
                <Typography lineHeight="normal" variant="caption" component="time">
                  ۱۴۰۲/۰۵/۲۵
                </Typography>
              </Stack>
            </Box>
          </Box>
          <Box sx={{display: 'flex', gap: 1}}>
            <Box
              component="img"
              sx={{
                width: 150,
                minWidth: 150,
                height: 150,
                borderRadius: '20px',
              }}
              src={nail}
            />
            <Box>
              <Typography
                lineHeight="normal"
                variant="subtitle2"
                fontWeight="800"
                component="h2"
                mb={0.5}
              >
                فواید پروتیین تراپی
              </Typography>
              <Typography mb={0.5} lineHeight="normal" variant="caption" component="p">
                پروسه پروتیین تراپی با تقویت و تغذیه تارهای مو تارهای آسیب دیده را ترمیم
                کرده و به درمان مشکل شکستگی خشکی و آسیب دیدگی مو کمک میکند این درمانها یک
                لایه محافظتی روی مو تشکیل میدهد.
              </Typography>
              <Stack flexDirection="row" justifyContent="space-between">
                <Typography lineHeight="normal" variant="caption" component="p">
                  نویسنده: لیلا شهابی
                </Typography>
                <Typography lineHeight="normal" variant="caption" component="time">
                  ۱۴۰۲/۰۵/۲۵
                </Typography>
              </Stack>
            </Box>
          </Box>
          <Box sx={{display: 'flex', gap: 1}}>
            <Box
              component="img"
              sx={{
                width: 150,
                minWidth: 150,
                height: 150,
                borderRadius: '20px',
              }}
              src={nail}
            />
            <Box>
              <Typography
                lineHeight="normal"
                variant="subtitle2"
                fontWeight="800"
                component="h2"
                mb={0.5}
              >
                فواید پروتیین تراپی
              </Typography>
              <Typography mb={0.5} lineHeight="normal" variant="caption" component="p">
                پروسه پروتیین تراپی با تقویت و تغذیه تارهای مو تارهای آسیب دیده را ترمیم
                کرده و به درمان مشکل شکستگی خشکی و آسیب دیدگی مو کمک میکند این درمانها یک
                لایه محافظتی روی مو تشکیل میدهد.
              </Typography>
              <Stack flexDirection="row" justifyContent="space-between">
                <Typography lineHeight="normal" variant="caption" component="p">
                  نویسنده: لیلا شهابی
                </Typography>
                <Typography lineHeight="normal" variant="caption" component="time">
                  ۱۴۰۲/۰۵/۲۵
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
