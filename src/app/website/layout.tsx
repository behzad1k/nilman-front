import {Header, AppBar} from './components';

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Header />
      {children}
      <AppBar />
    </>
  );
}
