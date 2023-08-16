import {createTheme, ThemeProvider} from '@mui/material';

export const Theme = createTheme({
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

export default function CustomThemeProvider({children}: {children: React.ReactNode}) {
  return <ThemeProvider theme={Theme}>{children}</ThemeProvider>;
}
