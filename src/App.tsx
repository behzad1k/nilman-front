import {Provider} from 'react-redux';
import store from './services/redux/store.ts';
import '../public/css/App.css';
import Website from './app/website/website.tsx';
import Dashboard from './app/dashboard/dashboard.tsx';

function App() {
  return (
    <Provider store={store}>
      <Website />
      <Dashboard />
    </Provider>
  );
}

export default App;
