require("../../models/index");
const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
const UserType = require("./user_type");
const ProductType = require("./product_type");
const CategoryType = require("./category_type");
const User = mongoose.model("user");
const Product = mongoose.model("product");
const Category = mongoose.model("category");
const Cart = mongoose.model("cart");
const CartType = require("./cart_type");
const Order = mongoose.model("order");
const OrderType = require("./order_type");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      }
    },
    products: {
        type: new GraphQLList(ProductType),
        resolve(){
          return Product.find({})
            .populate('category')
        }
    },
    product: {
      type: ProductType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Product.findById(args._id);
      }
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve() {
        return Category.find({});
      }
    },
    category: {
      type: CategoryType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Category.findById(args._id);
      }
    },
    categoryByName: {
      type: new GraphQLList(CategoryType),
      args: { name: { type: GraphQLString } },
      resolve(_, args) {
        return Category.find({ name: args.name })
          .populate("products")
      }
    },
    productByNameOrDescription: {
      type: new GraphQLList(ProductType),
      args: { searchText: { type: GraphQLString }},
      resolve(_, { searchText }){
        return Product.find({ $text: { $search: searchText } }).populate("category").then(products => products).catch(e => console.log(e));
      }
    },
    carts: {
      type: new GraphQLList(CartType),
      resolve() {
        return Cart.find({})
          .populate("user")
          .populate("products");
      }
    },
    cart: {
      type: CartType,
      args: { userId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, { userId }) {
        return Cart.find({ user: userId })
          .populate("products")
          .then(carts => {
            console.log('no of products', carts[0].products.length)
            return carts[0]
          });
      }
    },
    orders: {
      type: new GraphQLList(OrderType),
      args: { userId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, { userId }) {
        return Order.find({ user: userId })
          .populate("user")
          .populate("products");
      }
    },
    order: {
      type: OrderType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Order.findById(args._id);
      }
    }
  })
});

module.exports = RootQueryType;