const { GraphQLError } = require('graphql');

const ensureUserIsLogged = (context) => {
    console.log("context ensureUserIsLogged:", context);
    if (!context.user) {
        throw new GraphQLError("Unauthorized");
    }
}

module.exports = ensureUserIsLogged;