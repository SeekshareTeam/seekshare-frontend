import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import client from '../client';
import { store } from 'src/modules/Redux';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
      </Provider>
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
