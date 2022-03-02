const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
        picture: String
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
        confirmPassword: String!
        picture: String
    }

    input UserLoginInputData {
        email: String!
        password: String!
    }



    type AuthData {
        _id: ID!
        name: String!
        email: String!
        picture: String
        token: String!
    }

    type RootQuery {
        login(loginInput:UserLoginInputData): AuthData!
    }

    type RootMutation {
        createUser(userInput: UserInputData): AuthData!
        
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
