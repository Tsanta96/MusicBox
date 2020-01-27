require("../../models/index");
const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const UserType = require("./user_type");
const ProductType = require("./product_type");
const CategoryType = require("./category_type");
const User = mongoose.model("user");
const Product = mongoose.model("product");
const Category = mongoose.model("category");

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
        }
    },
    product: {
        type: ProductType,
        args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(_, args) {
            return Product.findById(args._id)
        }
    },
    categories: {
        type: new GraphQLList(CategoryType),
        resolve(){
            return Category.find({})
        }
    },
    category: {
        type: CategoryType,
        args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(_, args) {
            return Category.findById(args._id)
        }
    }
   })
});

module.exports = RootQueryType;