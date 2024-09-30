import { X } from '@phosphor-icons/react';
import Cookies from 'js-cookie';
import { FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {Box, Button, Container, Rating, Typography} from '@mui/material';
import {TextareaAutosize} from '@mui/base/TextareaAutosize';
import {urls} from '../../../../services/endPoint.ts';
import {api} from '../../../../services/http.ts';
import { order as orderSlice } from '../../../../services/redux/reducers/orderSlice.ts';
import { useAppSelector } from '../../../../services/redux/store.ts';
import { IOrder } from '../../../../services/types.ts';
import Success from './success.tsx';
import {toast} from 'react-toastify';

export default function Feedback({ order }) {
  const [rate, setRate] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [tab, setTab] = useState('good');
  const [factors, setFactors] = useState([]);
  const [selectedFactors, setSelectedFactors] = useState([]);
  const params = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const tabTitles = {
    good: 'نقاط قوت',
    bad: 'نقاط ضعف',
  }

  const handleRate = (e: SyntheticEvent, newRate: number | null) => {
    if (newRate) setRate(newRate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    // if (!comment) {
    //   return toast('نظر خود را وارد کنید');
    // }
    // if (rate === 0) {
    //   return toast('ابتدا امتیاز بدهید');
    // }
    const reqBody = {
      orderId: order.id,
      rate,
      comment,
      factors: selectedFactors
    };
    const res = await api(urls.feedback, { method: 'POST', body: reqBody}, true);
    if (res.code === 200) {
      toast('نظر شما با موفقیت ثبت شد', { type: 'success'})
      setSelectedFactors([]);
      setRate(5);
      setComment('');
      dispatch(orderSlice())
    }
  };

  const fetchFactors = async () => {
    const res = await api(urls.feedbackFactors, { method: 'GET'})
    setFactors(res.data)
  };

  useEffect(() => {
    if (Cookies.get('token') == undefined){
      toast('لطفا ابتدا وارد شوید', { type: 'error' })
      navigate(`/login?from=/feedback/${params.id}`)
    } else {
      fetchFactors();
    }
  }, []);

  return (
    <Box component="main" minHeight="100vh">
      <Container
        sx={{
          flex: 1,
          display: 'flex',
          py: 2,
          flexDirection: 'column',
          gap: 3,
          height: '100%'
        }}
      >
        {/* <Button sx={{ marginLeft: 'auto'}} onClick={handleSubmit}> */}
        {/*   <X size={20}/> */}
        {/* </Button> */}
            <Typography variant="body2" lineHeight="26px" component="h2" margin={'auto'}>{order.code}</Typography>
            <Typography variant="body2" lineHeight="26px" component="p">
              لطفا جهت نظارت و بهبود عملکرد، تجربه خود را با ما به اشتراک بگذارید.
            </Typography>
            <Box
              onSubmit={handleSubmit}
              component="form"
              display="flex"
              flexDirection="column"
              gap={4}
            >
              <Rating
                // name="rating"
                size="large"
                value={rate}
                // dir={'ltr'}
                onChange={handleRate}
                sx={{
                  marginInline: 'auto',
                  '& .muirtl-1vooibu-MuiSvgIcon-root': {width: 42, height: 42},
                  '& .MuiRating-iconFilled': {color: 'var(--mid-pink)'},
                }}
              />

              <div className='feedbackFactors'>
                <div className='feedbackFactorsCol'>
                  <span className='feedbackFactorsCell head'>نقاط مثبت</span>
                  {factors?.filter(e => e.isPositive).map(e => <span className={`feedbackFactorsCell positive${selectedFactors.includes(e.id) ? ' selected' : ''}`} onClick={() => setSelectedFactors(prev => prev.includes(e.id) ? prev.filter(j => j != e.id) : [...prev, e.id])}>{e.title}</span>)}
                </div>
                <div className='feedbackFactorsCol'>
                  <span className='feedbackFactorsCell head'>نقاط منفی</span>
                  {factors?.filter(e => !e.isPositive).map(e => <span className={`feedbackFactorsCell negative${selectedFactors.includes(e.id) ? ' selected' : ''}`} onClick={() => setSelectedFactors(prev => prev.includes(e.id) ? prev.filter(j => j != e.id) : [...prev, e.id])}>{e.title}</span>)}
                </div>
              </div>

              <TextareaAutosize
                className="comment-textarea"
                minRows={5}
                maxRows={6}
                // name="comment"
                placeholder="نظر خود را بنویسید ..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{backgroundColor: 'var(--mid-pink)', marginTop: 'auto'}}
              >
                ثبت
              </Button>
            </Box>
      </Container>
    </Box>
  );
}
