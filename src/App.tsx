import {Provider} from 'react-redux';
import store from './services/redux/store.ts';
import './assets/css/App.css';
import Website from './app/website/website.tsx';
import Dashboard from './app/dashboard/dashboard.tsx';
import {Routes, Route} from 'react-router-dom';
import {Mui} from './mui.tsx';

function App() {
  return (
    <Provider store={store}>
      <Mui>
        <Routes>
          <Route path="/*" element={<Website />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Mui>
    </Provider>
  );
}

export default App;
