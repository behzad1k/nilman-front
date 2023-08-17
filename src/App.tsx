import {Provider} from 'react-redux';
import store from './services/redux/store.ts';
import './assets/css/App.css';
import Website from './app/website/website.tsx';
import Dashboard from './app/dashboard/dashboard.tsx';
import { createTheme, ThemeProvider } from "@mui/material";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";

function App() {
  const theme = createTheme({
    direction: 'rtl',
  });
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return (
    <Provider store={store}>
      <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Website />
        <Dashboard />
      </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

export default App;
