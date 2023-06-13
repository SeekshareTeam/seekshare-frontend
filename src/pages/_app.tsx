import '@fontsource/jetbrains-mono';
import '@milkdown/theme-nord/style.css';
import '../../styles/globals.css';
import '../../styles/prose.css';
import '../../styles/prosemirror.css';
import 'react-toastify/dist/ReactToastify.min.css';

import type { AppProps /*, AppContext */ } from 'next/app';
import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import NextNProgress from 'nextjs-progressbar';

import ErrorBoundary from 'src/components/ErrorBoundary';
import { getApolloClient } from 'src/config/apollo/client';
import { wrapper } from 'src/modules/Redux';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { ApiProvider } from 'src/api/context';
import { AuthGate } from 'src/components/Layouts/AuthGate';
import { GeneralLayout } from 'src/components/Layouts';
import PageAuthenticator from 'src/components/Auth';
import { PageWithLayout } from 'src/utils/types';

// TODO: remove other
const layouts = ['general', 'other'] as const;
type Layout = (typeof layouts)[number];

const isLayout = (layout: unknown): layout is Layout => {
  // Using layouts.includes causes a typescript issue
  return typeof layout === 'string' && layouts.some((l) => l === layout);
};

const getLayout = (layout: Layout): React.FC<object> => {
  if (layout === 'general') {
    return GeneralLayout;
  }

  const other = () => <div />;
  return other;
};

const NoLayout: React.FC<{ children: React.ReactNode }> = (props) => (
  <>{props.children}</>
);

function MyApp({
  Component,
  ...rest
}: AppProps & { Component: PageWithLayout<AppProps['Component']> }) {
  let Layout = NoLayout;

  if (isLayout(Component.layoutType)) {
    Layout = getLayout(Component.layoutType);
  }

  const { store, props } = wrapper.useWrappedStore(rest);

  console.log('@@@ store', store);
  console.log('@@@ props', props);

  React.useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <ApolloProvider client={getApolloClient()}>
      <Provider store={store}>
        <ToastContainer />
        <ApiProvider>
          <SessionProvider session={props.session}>
            <AuthGate>
              <NextNProgress height={3} options={{ showSpinner: false }} />
              <div id="modal-root" />
              <div id="sidebar-root" />
              <ErrorBoundary>
                <PageAuthenticator permissionTypes={Component?.accessLevel}>
                  <Layout>
                    <Component {...props.pageProps} />
                  </Layout>
                </PageAuthenticator>
              </ErrorBoundary>
            </AuthGate>
          </SessionProvider>
        </ApiProvider>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
