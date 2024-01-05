import {FormEvent, SyntheticEvent, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Box, Button, Container, Rating, Typography} from '@mui/material';
import {TextareaAutosize} from '@mui/base/TextareaAutosize';
import {urls} from '../../../../services/endPoint.ts';
import {api} from '../../../../services/http.ts';
import Success from './success.tsx';
import {toast} from 'react-toastify';

export default function Feedback() {
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const params = useParams();

  const handleRate = (e: SyntheticEvent, newRate: number | null) => {
    if (newRate) setRate(newRate);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!comment) {
      return toast('نظر خود را وارد کنید');
    }
    if (rate === 0) {
      return toast('ابتدا امتیاز بدهید');
    }
    const reqBody = {
      orderId: Number(params.id),
      rate,
      comment,
    };
    console.log(reqBody);

    const res = {code: 201};
    // const res = await api(urls.feedback, reqBody, true);
    if (res.code === 201) {
      setIsSubmitted(true);
    }
  };

  return (
    <Box component="main" minHeight="100vh">
      <Container
        sx={{
          flex: 1,
          display: 'flex',
          py: 2,
          flexDirection: 'column',
          gap: 4,
          minHeight: '100vh',
        }}
      >
        {!isSubmitted ? (
          <>
            <Typography variant="body2" lineHeight="26px" component="p">
              لطفا جهت نظارت و بهبود عملکرد، نظر و تجربه خود را با ما به اشتراک بگزارید.
            </Typography>
            <Box
              onSubmit={handleSubmit}
              component="form"
              display="flex"
              flexDirection="column"
              gap={4}
            >
              <Rating
                name="rating"
                size="large"
                value={rate}
                onChange={handleRate}
                sx={{
                  marginInline: 'auto',
                  flexDirection: 'row-reverse',
                  '& .muirtl-1vooibu-MuiSvgIcon-root': {width: 42, height: 42},
                  '& .MuiRating-iconFilled': {color: 'var(--mid-pink)'},
                }}
              />
              <TextareaAutosize
                className="comment-textarea"
                minRows={5}
                maxRows={6}
                name="comment"
                placeholder="نظر خود را بنویسید ..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{backgroundColor: 'var(--mid-pink)'}}
              >
                ثبت
              </Button>
            </Box>
          </>
        ) : (
          <Success />
        )}
      </Container>
    </Box>
  );
}
