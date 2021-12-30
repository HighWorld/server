const Post = require('../../models/Post');
const checkAuth = require('../../authentication/auth');
const { UserInputError, AuthenticationError } = require('apollo-server');

module.exports = {
    Mutation:{
        createComment: async (parent, {postId, body}, context)=>{
            const user = checkAuth(context);
            if(body){
                const post = await Post.findById(postId);
                if(post){
                    post.comments.unshift({
                        body,
                        username: user.username
                    });

                    await post.save();

                    return post;
                }
                throw new AuthenticationError("Invalid Authentication");
            }
            throw new UserInputError("Empty comment body");
        },

        deleteComment: async (parent, {postId, commentId}, context) => {
            const user = checkAuth(context);

            // console.log(user);

            const post = await Post.findById(postId);

            if(post){
                const commentIndex = post.comments.findIndex(c => c.id === commentId);

                // console.log(post.comments);
                // console.log(commentIndex);

                if(commentIndex===-1){
                    throw new Error("No such comment exist");
                }

                if(post.comments[commentIndex].username === user.username){
                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return "Comment deleted successfully!";
                }
                throw new AuthenticationError("Invalid Authentication");

            }
            throw new UserInputError("Empty comment body");
        }
    }
};