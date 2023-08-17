import {Paper, Card, Typography, Container, Box} from '@mui/material';

export default function Home() {
  return (
    <>
      <Paper
        elevation={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
          gap: 1,
        }}
      >
        <Typography component="p" variant="h4" fontWeight="700">
          ۲
        </Typography>
        <Typography component="h1" variant="body2">
          درامد ماهانه
        </Typography>
      </Paper>{' '}
      <Paper
        elevation={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
          gap: 1,
        }}
      >
        <Typography component="p" variant="h4" fontWeight="700">
          23
        </Typography>
        <Typography component="h1" variant="body2">
          سفارش بررسی نشده
        </Typography>
      </Paper>
      {/* <Paper elevation={3} sx={{padding: 3, position: 'relative'}}>
          <Box
            position="absolute"
            right={0}
            left={0}
            margin="auto"
            width={'fit-content'}
            top={'-40%'}
            py={1.5}
            px={3}
            bgcolor={theme.palette.primary.main}
            borderRadius={1}
          >
            <Typography component="h2" variant="body1" textAlign="center" color={'white'}>
              تعداد سفارش ها
            </Typography>
          </Box>
        </Paper> */}
    </>
  );
}
