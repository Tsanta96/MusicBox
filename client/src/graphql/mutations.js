import gql from "graphql-tag";

export const LOGIN_USER = gql `
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      loggedIn
    }
  }
`;

export const VERIFY_USER = gql `
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token) {
      loggedIn
    }
  }
`;

export const REGISTER_USER = gql `
  mutation RegisterUser($name: String!, $email: String!, $password: String!, $password2: String!) {
    register(name: $name, email: $email, password: $password, password2: $password2) {
      token
      loggedIn
    }
  }
`;

export const ADD_TO_CART = gql `
  mutation AddToCart($productId: ID!, $cartId: ID!) {
    addToCart(productId: $productId, cartId: $cartId) {
      cart {
        _id
        user
        products
      }
    }
  }
`;

export const CREATE_CART = gql`
  mutation CreateCart($userId: ID!) {
    newCart(userId: $userId) {
      _id
      user {
        _id
        name
      }
    }
  }
`;