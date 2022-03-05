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

    type UserFetch{
        _id: ID!
        name: String!
        email: String!
        picture: String
    }

    type AuthData {
        _id: ID!
        name: String!
        email: String!
        picture: String
        token: String!
    }

    input FetchChat{
        userId: String!
    }

    type FetchData{
        _id: ID!
        chatName: String!
        isGroupChat: Boolean!
        users: [UserFetch!]!
        groupAdmin: [UserFetch]
        createdAt: String
        updatedAt: String
    }

    type GroupData{
        _id: ID!
        chatName: String!
        isGroupChat: Boolean!
        users: [UserFetch!]!
        groupAdmin: [UserFetch!]!
    }

    type FetchAllData{
        fetched:[FetchData]
    }

    type RootQuery {
        login(loginInput:UserLoginInputData): AuthData!
    }

    type RootMutation {
        createUser(userInput: UserInputData): AuthData!
        accessChat(fetchInput: FetchChat): FetchData!
        fetchAllChats: FetchAllData
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
