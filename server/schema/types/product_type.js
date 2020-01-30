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
        resolver(parentValue){(
            Product.findById(parentValue._id)
                .populate("category")
                .then(product => (product.category))
        )}
    },
    description: { type: GraphQLString },
    weight: { type: GraphQLInt },
    price: { type: GraphQLFloat },
    imageUrl: { type: GraphQLString }
  })
});

module.exports = ProductType;