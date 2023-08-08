// import {AppBar, Header, NewTweak} from './components';
import AllRoutes from './routes/allRoutes';
import {Provider} from 'react-redux';
import store from './services/redux/store.ts';
import '../public/css/App.css';


function App() {
  return (
    <Provider store={store}>
      <AllRoutes />
    </Provider>
  );
}

export default App;
