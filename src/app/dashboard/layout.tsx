import {Box, Container} from '@mui/material';
import CustomThemeProvider from './theme';
import Rtl from './rtl';
import Header from './components/header';
import {Theme} from './theme';
export default function Layout({children}: {children: React.ReactNode}) {
  const drawerWidth = 270;
  return (
    <Rtl>
      <CustomThemeProvider>
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
          <Header drawerWidth={drawerWidth} />
          <Box
            component="main"
            p={0}
            flexGrow={1}
            bgcolor="#F4F7FA"
            width={{md: `calc(100% - ${drawerWidth}px)`}}
            ml={{md: `${drawerWidth}px`}}
          >
            <Container
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                py: 5,
              }}
            >
              {children}
            </Container>
          </Box>
        </Box>
      </CustomThemeProvider>
    </Rtl>
  );
}
