'use client';

import { Provider } from 'react-redux';
import { store } from './store/store';
import { SessionProvider } from 'next-auth/react';

// Wraps the app with Redux and NextAuth providers
export function Providers({ children }) {
  return (
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
      <Provider store={store}>
        {children}
      </Provider>
    </SessionProvider>
  );
}
