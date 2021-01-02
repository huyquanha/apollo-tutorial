import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
  gql,
  useQuery,
} from '@apollo/client';
import { cache } from './cache';
import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';
import Login from './pages/login';
import injectStyles from './styles';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }
`;

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql',
  headers: {
    authorization: localStorage.getItem('token') || '',
  },
  typeDefs,
});

injectStyles();

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const IsLoggedIn = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Pages /> : <Login />;
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>,
  document.getElementById('root')
);
