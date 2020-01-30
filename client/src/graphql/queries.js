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

export const IS_LOGGED_IN = gql`
         query IsUserLoggedIn {
           isLoggedIn @client
           name @client
           email @client
           cart @client {
             products {
               name
               _id
               price
             }
           }
         }
       `;

export const FIND_USER_CART = gql `
    query findUserCart($userId: ID!) {
      cart(userId: $userId) {
        _id,
        products{
          name,
          _id,
          price
        }
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

export const PRODUCTS_BY_CATEGORY_BY_NAME = gql`
     query fetchCategoryBy($name: String!) {
      categoryByName(name: $name){
        _id,
        name,
        products {
          _id,
          name,
          category {
            name, 
            _id
          },
          description,
          weight,
          price
        }
      }
      }
    `;

// export const FULL_USER = gql `
//   query fullUser {
//     name @client,
//     email @client
//   }
// `;
