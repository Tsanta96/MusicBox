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
    }
`;