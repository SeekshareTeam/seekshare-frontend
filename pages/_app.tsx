import '../styles/globals.css';
import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import { GeneralLayoutType } from 'src/components/Layouts';
// import client from '../client';
import { getApolloClient } from 'src/config/apollo/client';
import { wrapper } from 'src/modules/Redux';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { ApiProvider } from 'src/api/context';
import { AuthGate } from 'src/components/Layouts/AuthGate';
import type { AppProps /*, AppContext */ } from 'next/app';

type AppWithLayout<T> = T & { getLayout?: GeneralLayoutType };

function MyApp({
  Component,
  ...rest
}: AppProps & { Component: AppWithLayout<AppProps['Component']> }) {
  const getLayout = Component.getLayout || ((page: JSX.Element) => page);

  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <ApolloProvider client={getApolloClient()}>
      <SessionProvider session={props.session}>
        <Provider store={store}>
          <ApiProvider>
            <AuthGate>{getLayout(<Component {...props.pageProps} />)}</AuthGate>
          </ApiProvider>
        </Provider>
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp;
