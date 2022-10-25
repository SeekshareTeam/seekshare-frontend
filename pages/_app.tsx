import '@fontsource/jetbrains-mono';
import '../styles/globals.css';
import '../styles/Editor.css';

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
import { GeneralLayout } from 'src/components/Layouts';
import NextNProgress from 'nextjs-progressbar';
import type { AppProps /*, AppContext */ } from 'next/app';

type AppWithLayout<T> = T & {
  getLayout?: GeneralLayoutType;
  layoutType: string;
};

const myLayouts: { [key: string]: any } = {
  general: GeneralLayout,
};

function MyApp({
  Component,
  ...rest
}: AppProps & { Component: AppWithLayout<AppProps['Component']> }) {
  // const getLayout2 = Component.getLayout2 || ((page: JSX.Element) => page);

  const GetLayout =
    Component.layoutType in myLayouts
      ? myLayouts[Component.layoutType]
      : ((props => <>{props.children}</>) as React.FC);

  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <ApolloProvider client={getApolloClient()}>
      <Provider store={store}>
        <ApiProvider>
          <SessionProvider session={props.session}>
            <AuthGate>
              <NextNProgress height={3} options={{ showSpinner: false }} />
              <div id="modal-root" />
              <GetLayout>
                <Component {...props.pageProps} />
              </GetLayout>
            </AuthGate>
          </SessionProvider>
        </ApiProvider>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
