const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const mongoose = require("mongoose");
const CategoryType = require("./types/category_type");
const Category = mongoose.model("category");
const ProductType = require("./types/product_type");
const Product = mongoose.model("product");
const UserType = require("./types/user_type");
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
                description: { type: GraphQLString },
                weight: { type: GraphQLInt }
            },
            resolve(_, { name, description, weight }) {(
                new Product({ name, description, weight }).save()
            )}
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
        register: {
            type: UserType,
            args: {
              name: { type: GraphQLString },
              email: { type: GraphQLString },
              password: { type: GraphQLString }
            },
            resolve(_, args) { 
                return AuthService.register(args).then((success) => {
                    return success;
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
                return AuthService.login(args);
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