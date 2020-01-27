const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    buyer: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
   shippingAddress: String,
   price: {
       type: String,
       required: true
   },
   products: [
       {
           type: Schema.Types.ObjectId,
           ref: "product"
       }
   ],
   seller: {
       type: Schema.Types.ObjectId,
       ref: "user"
   }

}, {timestamps: true})