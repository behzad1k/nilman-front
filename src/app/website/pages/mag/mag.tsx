import {Box, Typography, Drawer, Container, Paper, Stack} from '@mui/material';
import moment from 'jalali-moment';
import { useDispatch } from 'react-redux';
import { Loading } from '../../../../components';
import {theme} from '../../../../mui';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import nail from '../../../../assets/img/category-nail.png';
import eyebrow from '../../../../assets/img/category-eyebrow.png';
import hair from '../../../../assets/img/category-hair.png';
import {SwipeableDrawer} from '@mui/material';
import { useRef, useEffect, ReactElement } from 'react';
import { SET_LOADING } from '../../../../services/redux/reducers/loadingSlice';
import { useAppSelector } from '../../../../services/redux/store';

export default function Mag() {
  const drawerEl = useRef<HTMLElement | null>(null);
  const categories = useAppSelector(state => state.globalReducer.postCategories);
  const dispatch = useDispatch();
  const list = () => {
    const rows: ReactElement[] = []

    const posts = [];
    categories.map(e => e.posts?.map(j => posts.push(j)))
    posts.map((post, index) => rows.push(
      <Box sx={{display: 'flex', gap: 1}} key={'post' + index} onClick={() => window.location.href = post.link}>
        <Box
          component="img"
          sx={{
            width: 150,
            minWidth: 150,
            height: 150,
            borderRadius: '20px',
          }}
          src={post.medias?.length > 0 ? post?.medias[post.medias?.length - 1] : nail}
        />
        <Box>
          <Typography
            lineHeight="normal"
            variant="subtitle2"
            fontWeight="800"
            component="h2"
            mb={0.5}
          >{post?.title}</Typography>
          <Typography mb={0.5} lineHeight="normal" variant="caption" component="p" maxWidth={200} dangerouslySetInnerHTML={{ __html: post?.summary }}></Typography>
          <Stack flexDirection="row" justifyContent="space-between">
            <Typography lineHeight="normal" variant="caption" component="time">
              {moment(post.date).format('jYYYY/jMM/jDD HH:mm')}
            </Typography>
          </Stack>
        </Box>
      </Box>
    ))

    return rows;
  };

  useEffect(() => {
    const element = drawerEl.current;
    if (element) {
      element.style.height = element.scrollHeight + 50 + 'px';
    }
  }, []);
  // if (categories.length < 1){
  //   return <Loading />
  // }
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
          modules={[Autoplay]}
          autoplay
          centerInsufficientSlides
          className="categories-swiper"
        >
          {categories.map(e =>
            <SwiperSlide onClick={() => window.location.href = e.link}>
            {/* <img src={nail} alt="ناخن" /> */}
            <Typography>{e.name}</Typography>
          </SwiperSlide>
          )}
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
          {list()}
        </Container>
      </Box>
    </Box>
  );
}
