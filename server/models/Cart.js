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
}, {timestamps: true})

module.exports = mongoose.model("cart", CartSchema);