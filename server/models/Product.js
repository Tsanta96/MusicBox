const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category"
  },
  name: {
    type: String,
    required: true
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  imageUrl: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  inventoryAmount: {
    type: Number,
  },
  price: {
      type: Number,
      required: true
  },
  weight: {
    type: Number,
    required: false
  },
  reviews: 
      [
          {
              type: Schema.Types.ObjectId,
              ref: "review"
          }
      ]
  
});

module.exports = mongoose.model("product", ProductSchema);