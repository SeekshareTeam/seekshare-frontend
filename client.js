import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
console.log(console.log('pas', process.env.NEXT_PUBLIC_SERVER_API_URL));
const GRAPHQL_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_SERVER_API_URL,
  cache: new InMemoryCache()
});

export default client;
