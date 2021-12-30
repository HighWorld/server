require('dotenv').config();


const {ApolloServer} = require('apollo-server');
// const { PubSub } = require('graphql-subscriptions');
const gql = require("graphql-tag");
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');


// const pubsub = new PubSub();

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
    cors: true,
    typeDefs,
    resolvers,
    context: ({req})=>({req}),
});

mongoose.connect(process.env.MONGODB_URI).then(
    
    console.log("Connected to the database"),

    server.listen({port: PORT}).then(res =>{
        console.log(`Server running at ${res.url}`)
    }),

).catch(err=>{
    console.log(err);
});