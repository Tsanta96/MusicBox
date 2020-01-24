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
  description: {
    type: String,
    required: true
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