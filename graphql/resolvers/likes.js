const Post = require('../../models/Post');
const checkAuth = require('../../authentication/auth');
const { UserInputError, AuthenticationError } = require('apollo-server');

module.exports = {
    Mutation:{
        async likePost(parent, {postId}, context){
            const user = checkAuth(context);

            const post = await Post.findById(postId);

            if(post){
                if(post.likes.find(like => like.username === user.username)){
                    post.likes = post.likes.filter(like => like.username !== user.username);
                }
                else{
                    post.likes.push({
                        username: user.username
                    });
                }

                await post.save();

                return post;
            }
            throw new UserInputError("No such post exists");
        }
    }
}