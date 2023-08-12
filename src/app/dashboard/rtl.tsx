//* External
import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {prefixer} from 'stylis';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function Rtl({children}: {children: React.ReactNode}) {
  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}
