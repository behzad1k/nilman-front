import {Header} from './header';
import {AppBar} from './appBar';
import {NewTweak} from './newTweak';

export function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Header />
      {children}
      <NewTweak />
      <AppBar />
    </>
  );
}
