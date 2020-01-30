import gql from "graphql-tag";

export const LOGIN_USER = gql `
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      loggedIn
      _id
    }
  }
`;

export const VERIFY_USER = gql `
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token) {
      loggedIn,
      _id,
      name,
      email
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
      _id
      user {
        _id
        name
      }
      products {
        name
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

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($name: String!, $description: String!, $category: ID!, $seller: ID!, 
  $inventoryAmount: Int!, $price: Float!, $weight: Int!, $imageUrl: String) {
    
    newProduct(name: $name, description: $description, category: $category, seller: $seller,
    inventoryAmount: $inventoryAmount, price: $price, weight: $weight, imageUrl: $imageUrl) {
      _id
      imageUrl
    }
  }
`;

// export const CREATE_PRODUCT = gql `
//   mutation CreateProduct($name: String!, $description: String!, $category: ID!, $seller: ID!, $inventoryAmount: Int!) {
//     newProduct(name: $name, description: $description, category: $category, seller: $seller, inventoryAmount: $inventoryAmount) {
//       _id
//     }
//   }
// `;

// name: "testproduct", category: "instruments", description: "this is a test product", seller: "5e309ec1c4581c97b85fcd89", inventoryAmount: 43, price: 100, weight: 5, productImageUrl: "testproduct.com"
    
// name: "testproduct", description: "this is a test product", weight: 5, price: 100