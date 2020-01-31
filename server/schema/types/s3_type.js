const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;

const s3Type = new GraphQLObjectType({
    name: "s3Type",
    fields: {
      signedRequest: { type: GraphQLString },
      url: { type: GraphQLString }
    }
});

module.exports = s3Type;