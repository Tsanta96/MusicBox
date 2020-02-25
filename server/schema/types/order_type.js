const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Order = mongoose.model("order");
const Category = mongoose.model("category");

const OrderType = new GraphQLObjectType({
  name: "OrderType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    user: {
        type: require("./user_type"),
        resolve(parentValue){(
            Order.findById(parentValue._id)
                .populate("user")
                .then(order => (order.user))
        )}
    },
    products: {
        type: new GraphQLList(require("./product_type")),
        resolve(parentValue) {{
          // return Category.findProducts(parentValue._id)
          return parentValue.products
        }}
    }
  })
});

module.exports = OrderType;