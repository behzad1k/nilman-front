import {Box} from '@mui/material';
import {WebsiteHeader, AppBar} from '../../components';

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <WebsiteHeader />
        <Box component="main" flexGrow={1} pb="60px">
          {children}
          <AppBar />
        </Box>
      </Box>
    </>
  );
}
