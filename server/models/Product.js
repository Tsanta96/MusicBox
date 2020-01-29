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
  ]
});

ProductSchema.statics.updateProductCategory = (productId, categoryId) => {
  // console.log(1, productId, categoryId); //categoryID is in 'single ticks'
  const Product = mongoose.model("product");
  const Category = mongoose.model("category");

  return Product.findById(productId).then(product => {
    // console.log(2, "product name -->", product.name);
    // if the product already had a category
    if (product.category) {
      // find the old category and remove this product from it's products
      // console.log(3, "product category --->", product.category);
      Category.findById(product.category).then(oldcategory => {
        // console.log(4, oldcategory);
        oldcategory.products.pull(product);
        return oldcategory.save();
      });
    }
    //  find the Category and push this product in, as well as set this product's category
    return Category.findById(categoryId).then(newCategory => {
      // console.log(5, newCategory);
      product.category = newCategory;
      newCategory.products.push(product);

      return Promise.all([product.save(), newCategory.save()]).then(
        ([product, newCategory]) => product
      );
    });
  });
};

module.exports = mongoose.model("product", ProductSchema);