const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLFloat } = graphql;
const mongoose = require("mongoose");
const CategoryType = require("./types/category_type");
const Category = mongoose.model("category");
const ProductType = require("./types/product_type");
const Product = mongoose.model("product");
const UserType = require("./types/user_type");
const CartType = require("./types/cart_type");
const Cart = mongoose.model("cart");
const AuthService = require("../services/auth");

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        newCategory: {
            type: CategoryType,
            args: {
                name: { type: GraphQLString }
            },
            resolve(_, { name }) {(
                new Category({ name }).save()
            )}
        },
        deleteCategory: {
            type: CategoryType,
            args: {
                _id: { type: GraphQLID }
            },
            resolve(_, { _id }) {(
                Category.remove({ _id })
            )}
        },
        newProduct: {
            type: ProductType,
            args: {
                name: { type: GraphQLString },
                category: { type: GraphQLID },
                description: { type: GraphQLString },
                seller: { type: GraphQLID },
                inventoryAmount: { type: GraphQLInt},
                weight: { type: GraphQLInt },
                price: { type: GraphQLFloat },
                imageUrl: { type: GraphQLString}

            },
            resolve(_, { name, category, description, seller, weight, price, inventoryAmount, imageUrl }) {
                console.log("THHHHIIIIIS");
                const newProduct = new Product({ name, category, description, seller, weight, price, inventoryAmount, imageUrl })

                return newProduct.save()
                    .then(product => {
                        Product.updateProductCategory(product._id, category)
                        console.log("prod cat --> ", product.category);
                        // const newerProduct = product.populate('category').save()
                        // console.log("Is it populated?", newerProduct.populated('category'));
                    })
                    // }).catch((err) => {
                    //     console.log("save didn't work");
                    // })
            }
        },
        newCart: {
            type: CartType,
            args: {
                userId: { type: GraphQLID }
            },
            resolve(_, { userId }) {
                return new Cart({ user: userId }).populate("user").save();
                //return Cart.find({user: userId}).populate("user").then(cart => cart)
            }
        },
        deleteProduct: {
            type: ProductType,
            args: {
                _id: { type: GraphQLID }
            },
            resolve(_, { _id }) {(
                Product.remove({ _id })
            )}
        },
        updateProductCategory: {
            type: ProductType,
            args: {
                productId: { type: GraphQLID },
                categoryId: { type: GraphQLID }
            },
            resolve(_, { productId, categoryId }) {
                return Product.updateProductCategory(productId, categoryId)
            }
        },
        addToCart: {
            type: CartType,
            args: {
                productId: { type: GraphQLID },
                cartId: { type: GraphQLID }
            },
            resolve(_, { productId, cartId }) {
                return Cart.addToCart(productId, cartId)
            }
        },
        register: {
            type: UserType,
            args: {
              name: { type: GraphQLString },
              email: { type: GraphQLString },
              password: { type: GraphQLString },
              password2: { type: GraphQLString }
            },
            resolve(_, args) { 
                return AuthService.register(args).then((user) => {
                    new Cart({ user: user }).save()
                    return user;
                }).catch((failure) => {
                    throw new Error(JSON.stringify(failure));
                })
            }
        },
        logout: {
            type: UserType,
            args: {
              // all we need to log the user our is an id
              _id: { type: GraphQLID }
            },
            resolve(_, args) {
              return AuthService.logout(args);
            }
        },
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(_, args) {
                return AuthService.login(args).then((success) => {
                    return success;
                }).catch((failure) => {
                    throw new Error(JSON.stringify(failure));
                })
            }
        },
        verifyUser: {
            type: UserType,
            args: {
                token: { type: GraphQLString }
            },
            resolve(_, args) {
                return AuthService.verifyUser(args);
            }
        }
    }
});

module.exports = mutation;