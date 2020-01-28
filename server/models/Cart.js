const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    products: [
        { type: Schema.Types.ObjectId,
        ref: "product"}
    ],
    price: Number,
    active: Boolean,
}, {timestamps: true});

CartSchema.statics.addToCart = (productId, cartId) => {
    const Product = mongoose.model("product");
    const Cart = mongoose.model("cart");

    return Cart.findById(cartId).then(cart => {
        return Product.findById(productId).then(product => {
            console.log("cart: ", cart);
            console.log("product: ", product);
            cart.products.push(product);

            // return Promise.all([cart.save()]).then(
            //     ([cart]) => cart
            // );
            return cart.save().then(cart => cart);
        });
    });
};

module.exports = mongoose.model("cart", CartSchema);