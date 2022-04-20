import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  createHttpLink,
  from
} from "@apollo/client";
import { getSession } from "next-auth/react";

import { setContext } from "@apollo/client/link/context";

import {
  NextApiRequestCookies,
  // @ts-ignore This path is generated at build time and conflicts otherwise
} from 'next-server/server/api-utils';
import { IncomingMessage } from "http";

// console.log(console.log('pas', process.env.NEXT_PUBLIC_SERVER_API_URL));

export type ApolloClientContext = {
  req?: IncomingMessage & {
    cookies: NextApiRequestCookies
  }
};

const httpLink = createHttpLink({
	uri: process.env.NEXT_PUBLIC_SERVER_API_URL,
});


const authLink = setContext(async (_, { headers }: { headers: Headers }) => {
	const session = await getSession();

  console.log('@ session in authlink', session);
	const modifiedHeader = {
		headers: {
			...headers,
			authorization: session?.accessToken
				? `Bearer ${session.accessToken}`
				: "",
		},
	};
	return modifiedHeader;
});

// const GRAPHQL_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

// const client = new ApolloClient({
//   uri: process.env.NEXT_PUBLIC_SERVER_API_URL,
//   cache: new InMemoryCache()
// });

export const getApolloClient = (
  ctx?: ApolloClientContext,
  initialState?: NormalizedCacheObject
) => {
  if (ctx && ctx.req) {
    let { req } = ctx;
    // Do something with the cookies here, maybe add a header for authentication
    req.cookies
  }

  // const httpLink = createHttpLink({
  //   uri: "https://countries.trevorblades.com",
  //   fetch,
  // });
  const cache = new InMemoryCache().restore(initialState || {});
  return new ApolloClient({
    link: from([authLink, httpLink]),
    cache,
  });
};
