const { buildSchema } = require('graphql');

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

    input CreateGroupChatInputData {
        chatName: String!
        users: [Users]!
        groupAdmin: String!
    }

    type CreateGroupChat {
        _id: ID!
        chatName: String!
        users: [Users]!
        isGroupChat: Boolean!
        groupAdmin: String!
    }
    
    input RenameGroupInputData {
        chatId: ID!
        chatName: String!
    }

    type RenameGroup {
        chatId: ID!
        chatName: String!
        new: Boolean!
    }

    type RootQuery {
        login(loginInput:UserLoginInputData): AuthData!
    }

    type RootMutation {
        createUser(userInput: UserInputData): AuthData!
        accessChat(fetchInput: FetchChat): FetchData!
        fetchAllChats: FetchAllData
        createGroupChat(groupChatInput: CreateGroupChatInputData): CreateGroupChat!
        renameGroup(renameGroupInput: RenameGroupInputData): RenameGroup!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
