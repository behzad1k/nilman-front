import {Box} from '@mui/material';
import PullToRefresh from 'react-simple-pull-to-refresh';
import {WebsiteHeader, AppBar} from '../../components';
import { initialApis } from '../../services/apis/global.ts';
import { useAppDispatch } from '../../services/redux/store.ts';

export default function Layout({children}: {children: React.ReactNode}) {
  const dispatch = useAppDispatch();
  return (
      <PullToRefresh onRefresh={async () => initialApis(dispatch)}>
      <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <WebsiteHeader />
        <Box component="main" flexGrow={1}>
          {children}
          <AppBar />
        </Box>
      </Box>
      </PullToRefresh>
  );
}
