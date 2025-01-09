import {Box} from '@mui/material';
import PullToRefresh from 'react-simple-pull-to-refresh';
import {WebsiteHeader, AppBar, Loading} from '../components';
import Snow from '../components/common/Snow';
import {initialApis} from '../services/apis/global';
import {useAppDispatch, useAppSelector} from '../services/redux/store';
import Feedback from '../pages/feedback/feedback';

export default function Layout({children}: {children: React.ReactNode}) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.loadingReducer.loading);
  const feedback = useAppSelector(state => state.orderReducer.orders).find(e => !e.isFeedbacked && e.status == 'Done')
  if (feedback){
    return <Feedback order={feedback}/>
  }
  return (
    <>
      {/* <PullToRefresh onRefresh={async () => initialApis(dispatch)}> */}
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
          <WebsiteHeader />
          <Box component="main" flexGrow={1}>
            {children}
            <AppBar />
          </Box>
          <Snow />
        </Box>
      {/* </PullToRefresh> */}
      {loading && <Loading/>}
    </>
  );
}
