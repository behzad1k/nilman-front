import CustomThemeProvider from './theme';
import Rtl from './rtl';
import Header from './components/header';

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <Rtl>
      <CustomThemeProvider>
        <Header />
        {children}
      </CustomThemeProvider>
    </Rtl>
  );
}
