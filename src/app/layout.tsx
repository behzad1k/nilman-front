import {Box} from '@mui/material';
import { AppBar } from '../components/layers/AppBar.tsx';
import { Header } from '../components/layers/Header.tsx';
import {useAppDispatch, useAppSelector} from '../services/redux/store';
import Feedback from '../pages/feedback/feedback';

export default function Layout({children}: {children: React.ReactNode}) {
  const dispatch = useAppDispatch();
  const feedback = useAppSelector(state => state.orderReducer.orders).find(e => !e.isFeedbacked && e.status == 'Done')
  if (feedback){
    return <Feedback order={feedback}/>
  }
  return (
    <>
      {/* <PullToRefresh onRefresh={async () => initialApis(dispatch)}> */}
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
          <Header />
          <Box component="main" flexGrow={1}>
            {children}
            <AppBar />
          </Box>
          {/* <Snow /> */}
        </Box>
      {/* </PullToRefresh> */}
    </>
  );
}
