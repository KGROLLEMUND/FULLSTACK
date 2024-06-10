const typeDefs = `
    type Devi {
        id: ID!
        eventType: String!
        service: String!
        numberOfGuests: Int!
        date: String!
        totalAmount: Float!
        userId: Int!
        user: User!
    }
    
    type User {
        id: ID!
        firstName: String
        lastName: String
        mail: String
        password: String
        isAdmin: Boolean
        devis: [Devi!]!
    }
    
    type Response {
        success: Boolean!
        message: String!
    }
    
    type JWT {
        token: String!
    }
    
    input UserInput {
        firstName: String!
        lastName: String!
        mail: String!
        password: String!
    }
    
    input DeviInput {
        eventType: String!
        service: String!
        numberOfGuests: Int!
        date: String!
        totalAmount: Float!
    }
    
    type Query {
        getDevis: [Devi!]!
        getDevi(id: ID!): Devi
    }
    
    type Mutation {
        registerUser(user: UserInput!): JWT!
        login(email: String!, password: String!): JWT!
        getMe: User!
        createDevi(devi: DeviInput!): Devi!
        updateDevi(id: ID!, devi: DeviInput!): Devi!
        deleteDevi(id: ID!): Response!
    }
`;

module.exports = typeDefs;
