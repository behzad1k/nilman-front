import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Website from './app/website';
import './assets/css/App.css';
import { DrawerProvider } from './components/layers/Drawer/DrawerContext';
import GlobalDrawer from './components/layers/Drawer/GlobalDrawer';
import { Mui } from './mui';
import store from './services/redux/store';

function App() {
  return (
    <Provider store={store}>
      <Mui>
        <DrawerProvider>
          <Routes>
            <Route path="*" element={<Website/>}/>
          </Routes>
          <ToastContainer
            progressStyle={{
              background:
                'linear-gradient( to right, rgb(255, 177, 177), rgb(255, 60, 60))',
            }}
            style={{
              marginTop: '50px',
              padding: '20px',
              right: 0
            }}
          />
          <GlobalDrawer />
        </DrawerProvider>
      </Mui>
    </Provider>
  );
}

export default App;
