const gql = require('graphql-tag');


const typeDefs = gql`
    
    type Comment{
        _id: ID!
        createdAt: String!
        username: String!
        body: String!
    }

    type Like{
        _id: ID!
        createdAt: String!
        username: String!
    }

    type Post{
        _id: ID!
        body: String!
        username: String!
        comments: [Comment]!
        likes: [Like]!
        createdAt: String!
        likeCount: Int!
        commentCount: Int!
    }

    type User{
        _id: ID!
        email: String!
        username: String!
        token: String!
    }

    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    type Query{
        getPosts: [Post]!
        getPost(postId:ID!): Post!
    }


    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: ID!, body: String!): Post! 
        deleteComment(postId: ID!, commentId: ID!): String!
        likePost(postId: ID!): Post!
    }

    # type Subscription{
    #     newPost: Post!
    # }

`;

module.exports = typeDefs;