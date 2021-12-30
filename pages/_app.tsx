import '../styles/globals.css';
import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
// import client from '../client';
import { getApolloClient } from 'src/config/apollo/client';
import { wrapper } from 'src/modules/Redux';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { AuthGate } from 'src/components/Layouts/AuthGate';
import type { AppProps /*, AppContext */ } from 'next/app'

function MyApp({ Component, ...rest }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page);

  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <ApolloProvider client={getApolloClient()}>
      <SessionProvider session={props.session}>
        <Provider store={store}>
          <AuthGate>
          {getLayout(<Component {...props.pageProps} />)}
          </AuthGate>
        </Provider>
      </SessionProvider>
    </ApolloProvider>
  );
  // return (
  //   <ApolloProvider client={client}>
  //     <AppLayout sidebar={<Sidebar />}>
  //       <Component {...pageProps} />
  //     </AppLayout>
  //   </ApolloProvider>
  // );
}

export default MyApp;
