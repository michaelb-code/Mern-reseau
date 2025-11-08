
const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;


//GET ALL POST
module.exports.readPost = async (req, res) => {
    try {
        const posts = await PostModel.find();
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(400).send(err);
    }

};

//CREATE POST
module.exports.createPost = async (req, res) => {
    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        video: req.body.vide,
        likers: [],
        comments: [],
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).send(err);
    }
};

//UPDATE POST
module.exports.updatePost = (req, res) => {

}

//DELETE POST
module.exports.deletePost = (req, res) => {

}