import {Link} from 'react-router-dom';
import {Player} from '@lottiefiles/react-lottie-player';
import {Box, Typography, Button} from '@mui/material';

export default function Success() {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5}}>
      <Player
        autoplay
        loop
        src="/celebrate.json"
        style={{width: '250px', maxHeight: '250px'}}
      ></Player>
      <Typography
        variant="h6"
        sx={{
          color: 'var(--dashboard-dark)',
          textShadow: '0px 5px 8px var(--dashboard-dark)',
        }}
      >
        نظر شما با موفقیت ثبت شد
      </Typography>
      <Link to="/">
        <Button
          variant="outlined"
          size="large"
          sx={{
            color: 'var(--dashboard-dark)',
            borderColor: 'transparent',
            backgroundColor: 'var(--white-pink)',
            boxShadow: '-2px 2px 4px 0px #bbb',
          }}
        >
          بازگشت به برنامه
        </Button>
      </Link>
    </Box>
  );
}
