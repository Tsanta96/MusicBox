import gql from "graphql-tag";

export const FETCH_PRODUCTS = gql `
  {
    products {
      _id
      name
    }
  }
`;

export const IS_LOGGED_IN = gql `
    query IsUserLoggedIn {
        isLoggedIn @client
    }
`;