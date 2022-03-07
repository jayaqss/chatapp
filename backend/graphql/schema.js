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
        _id: ID
        chatName: String
        isGroupChat: Boolean
        users: [UserFetch!]
        groupAdmin: UserFetch
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
        users: String
    }

    type CreateGroupChatData {
        _id: ID!
        chatName: String!
        isGroupChat: Boolean!
        users: [User]!
        groupAdmin: User
    }
    
    input RenameGroupInputData {
        chatId: ID!
        chatName: String!
    }

    type RenameGroupData {
        chatId: ID!
        chatName: String!
        new: Boolean!
    }

    input AddRemoveInputData {
        chatId: ID!
        userId: String!
    } 
    
    input SearchInputData {
        search: String!
    } 
    
    type SearchData{
        searchValue:[User]
    }

    type RootQuery {
        login(loginInput:UserLoginInputData): AuthData!
    }

    type RootMutation {
        createUser(userInput: UserInputData): AuthData!
        accessChat(fetchInput: FetchChat): FetchData!
        fetchAllChats: FetchAllData
        createGroupChat(groupChatInput: CreateGroupChatInputData): CreateGroupChatData!
        renameGroup(renameGroupInput: RenameGroupInputData): CreateGroupChatData!
        addGroup(addGroupInput:AddRemoveInputData):CreateGroupChatData!
        removeGroup(removeGroupInput:AddRemoveInputData):CreateGroupChatData!
        search(searchInput:SearchInputData): SearchData
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
