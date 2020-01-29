const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "product"
    }]
})

CategorySchema.statics.findProducts = function(categoryId) {
    // console.log("categoryId", categoryId);
    // console.log("this", this);
    return this.findById(categoryId)
            .populate("products")
            .then(category => {
                return category.products
            })
    
}

module.exports = mongoose.model("category", CategorySchema);