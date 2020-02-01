import gql from "graphql-tag";
// const mongoose = require("mongoose");
// const Product = mongoose.model("product");

export const FETCH_PRODUCTS = gql `
  {
    products {
      _id,
      name,
      description,
      price,
      weight,
      imageUrl
    }
  }
`;

export const FETCH_PRODUCT = gql `
query fetchProduct($productId: ID!){
  product(_id: $productId){
    _id,
    name,
    imageUrl,
    weight,
    price,
    description,
    seller {
      name,
      _id
    },
    category {
      name,
      _id
    }
  }
}
`

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

export const FETCH_CATEGORIES = gql `
  {
    categories {
      _id
      name
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
          imageUrl,
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

export const FETCH_PRODUCT_BY_NAME_OR_DESCRIPTION = gql `
query fetchProductByNameOrDescription($searchText: String!){
  productByNameOrDescription(searchText: $searchText){
    _id,
    name,
    imageUrl,
    weight,
    price,
    description,
    seller {
      name,
      _id
    },
    category {
      name,
      _id
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

