import gql from "graphql-tag";
// const mongoose = require("mongoose");
// const Product = mongoose.model("product");

export const FETCH_PRODUCTS = gql `
  {
    products {
      _id
      name
      description
      price
    }
  }
`;

export const IS_LOGGED_IN = gql `
    query IsUserLoggedIn {
        isLoggedIn @client
        name @client
        email @client
    }
`;

export const FIND_USER_CART = gql `
    query findUserCart($userId: ID!) {
      cart(userId: $userId) {
        _id
        user {
          _id
          name
        }
      }
    }
`;

export const FETCH_USER = gql `
    query fetchUser {
      currentUser @client
    }
`;

// export const FULL_USER = gql `
//   query fullUser {
//     name @client,
//     email @client
//   }
// `;
