import {createTheme, ThemeProvider} from '@mui/material';

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'vazir, poppins, serif',
  },
  palette: {},
});

export default function CustomThemeProvider({children}: {children: React.ReactNode}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
