import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {prefixer} from 'stylis';
import {createTheme, ThemeProvider} from '@mui/material/styles';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin as any],
});

export const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'vazir, poppins, serif',
  },
  palette: {
    primary: {
      main: '#3f4d67',
    },
  },
});

export function Mui({children}: {children: React.ReactNode}) {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}
