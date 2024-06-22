import {Box, Container} from '@mui/material';
import {DashboardHeader} from '../../components';
import {useAppSelector} from '../../services/redux/store';
import {useNavigate} from 'react-router-dom';

export default function Layout({children}: {children: React.ReactNode}) {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userReducer.data);
  const drawerWidth = 270;
  if (user.role !== 'SUPER_ADMIN') navigate('/login');

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      <DashboardHeader drawerWidth={drawerWidth} />
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
  );
}
