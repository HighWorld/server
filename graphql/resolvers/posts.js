const { UserInputError, AuthenticationError } = require('apollo-server');
const Post = require('../../models/Post');
const checkAuth = require('../../authentication/auth');

module.exports = {
    Query: {
        async getPosts(){
            try{
                const posts = await Post.find({}).sort({updatedAt: -1});
                return posts;
            }
            catch(error){
                // console.log(error);
            }
        },

        async getPost(parent, {postId}){
            try{
                const post = await Post.findById(postId);
                if(post){
                    return post;
                }
                throw new UserInputError("No such post exist");
            }
            catch(error){
                throw new Error(error);
            }
        },

        
    },
    Mutation:{
        async createPost(parent, {body}, context){
            const user = checkAuth(context);

            // user already authenticated

            if(user){
                const newPost = new Post({
                    body,
                user: user.id,
                username:user.username
                });

                const post = await newPost.save();

                // context.pubsub.publish('New Post', {newPost: post});

                return post;
            }
            throw new AuthenticationError("Invalid Authentication");
        },

        async deletePost(parent, {postId}, context){
            const user = checkAuth(context);

            // user already authenticated

            if(user){
                try{
                    const post = await Post.findOne({_id:postId, user:user.id});
                    if(post){
                        await post.delete();
                        return "Post deleted Successfully!!!!!";
                    }
                    throw new AuthenticationError("Cannot access the post");
                }
                catch(error){
                    throw new Error(error);
                }
            }
            throw new AuthenticationError("Invalid Authentication");
        }
    },

    // Subsription:{
    //     newPost: {
    //         subscribe: (_, __, {pubsub}) => pubsub.asyncIterator('New Post')
    //     }
    // }
}