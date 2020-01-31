const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Cart = mongoose.model("cart");
const Category = mongoose.model("category");

const CartType = new GraphQLObjectType({
  name: "CartType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    user: {
        type: require("./user_type"),
        resolver(parentValue){(
            Cart.findById(parentValue._id)
                .populate("user")
                .then(cart => (cart.user))
        )}
    },
    products: {
        type: new GraphQLList(require("./product_type")),
        resolve(parentValue) {{
          // console.log("parentValue: ", parentValue);
          // return CatCaregory.findProducts(parentValue._id)
          // return parentValue.products
          return Cart.findById(parentValue._id)
            .populate('products')
            .then(cart => cart.products);
        }}
    }
  })
});

module.exports = CartType;