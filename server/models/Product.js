const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
    // required: true
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
  reviews: [
    {
        type: Schema.Types.ObjectId,
        ref: "review"
    }
  ],
  filename: {
    type: String,
    required: false
  },
  filetype: {
    type: String,
    required: false
  }
});

ProductSchema.index({'$**': 'text'});



ProductSchema.statics.updateProductCategory = (productId, categoryId) => {
  const Product = mongoose.model("product");
  const Category = mongoose.model("category");

  return Product.findById(productId).then(product => {
    if (product.category) {
      Category.findById(product.category).then(oldcategory => {
        oldcategory.products.pull(product);
        return oldcategory.save();
      });
    }
    //  find the Category and push this product in, as well as set this product's category
    return Category.findById(categoryId).then(newCategory => {
      product.category = newCategory;
      newCategory.products.push(product);


      return Promise.all([product.save(), newCategory.save()]).then(
        ([product, newCategory]) => product
      );
    });
  });
};

module.exports = mongoose.model("product", ProductSchema);