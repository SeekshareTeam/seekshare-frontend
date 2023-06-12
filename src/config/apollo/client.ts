import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client';
import { getSession } from 'next-auth/react';

import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { Observable } from '@apollo/client/utilities';

import {
  NextApiRequestCookies,
  // @ts-ignore This path is generated at build time and conflicts otherwise
} from 'next-server/server/api-utils';
import { IncomingMessage } from 'http';

export type ApolloClientContext = {
  req?: IncomingMessage & {
    cookies: NextApiRequestCookies;
  };
};

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_API_URL,
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => {
        console.log(`[GraphQL error]: Message: ${message}`);
        return Observable.of(operation);
      });
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError.message}`);
      return Observable.of(operation);
    }
    return forward(operation);
  }
);

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();

  const modifiedHeader = {
    headers: {
      ...headers,
      authorization: session?.accessToken
        ? `Bearer ${session.accessToken}`
        : '',
    },
  };
  return modifiedHeader;
});

export const getApolloClient = (
  ctx?: ApolloClientContext,
  initialState?: NormalizedCacheObject
) => {
  if (ctx && ctx.req) {
    const { req } = ctx;
    // Do something with the cookies here, maybe add a header for authentication
    req.cookies;
  }

  const cache = new InMemoryCache().restore(initialState || {});
  return new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache,
  });
};
