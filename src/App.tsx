import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import store from './services/redux/store';
import './assets/css/App.css';
import Website from './app/website';
import {Routes, Route} from 'react-router-dom';
import {Mui} from './mui';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <Mui>
        <Routes>
          <Route path="*" element={<Website />} />
        </Routes>
        <ToastContainer
          progressStyle={{
            background:
              'linear-gradient( to right, rgb(255, 177, 177), rgb(255, 60, 60))',
          }}
          style={{marginTop: '50px', padding: '20px', right: 0}}
        />
      </Mui>
    </Provider>
  );
}

export default App;
