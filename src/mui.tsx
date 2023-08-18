import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {prefixer} from 'stylis';
import {
  createTheme,
  ThemeProvider,
  PaletteColor,
  SimplePaletteColorOptions,
} from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    pink: PaletteColor;
    lightBlack: PaletteColor;
    lightGrey: PaletteColor;
    whitePink: PaletteColor;
  }
  interface PaletteOptions {
    pink: SimplePaletteColorOptions;
    lightBlack: SimplePaletteColorOptions;
    lightGrey: SimplePaletteColorOptions;
    whitePink: SimplePaletteColorOptions;
  }
}

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
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
    pink: {
      main: 'rgb(236, 170, 151)',
      light: 'rgb(250, 224, 216)',
    },
    lightBlack: {
      main: 'rgb(51, 51, 51)',
    },
    whitePink: {
      main: 'rgba(248, 243, 243, 0.74)',
    },
    lightGrey: {
      main: 'rgba(224, 222, 222, 1)',
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
