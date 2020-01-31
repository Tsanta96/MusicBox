const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLFloat } = graphql;

const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    category: { 
        type: require("./category_type"),
        resolve(parentValue){
            return Product.findById(parentValue._id)
                .populate("category")
                .then(product => (product.category))
        }
    },
    seller: {
        type: require("./user_type"),
        resolve(parentValue){(
          Product.findById(parentValue._id)
              .populate("user")
              .then(product => (product.seller))
        )}
    },
    description: { type: GraphQLString },
    inventoryAmount: { type: GraphQLInt},
    price: { type: GraphQLFloat },
    weight: { type: GraphQLInt },
    imageUrl: { type: GraphQLString },
    filename: { type: GraphQLString },
    filetype: { type: GraphQLString }
  })
});

module.exports = ProductType;