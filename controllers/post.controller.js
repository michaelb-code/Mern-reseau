
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
module.exports.updatePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);

    const updatedRecord = {
        message: req.body.message,
    }

    try {
        const post = await PostModel.updateOne(
            { _id: req.params.id },
            { $set: updatedRecord }
        )

        return res.status(200).json(post);
    } catch (err) {
        return res.status(400).send(err);
    }
}

//DELETE POST
module.exports.deletePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);

    try {
        const deletedPost = await PostModel.deleteOne(
            { _id: req.params.id }
        )
        return res.status(200).json(deletedPost);
    } catch (err) {
        return res.status(400).send(err);
    }
}

//LIKE POST
module.exports.likePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);
    //ajout du like au post
    try {
        const likedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id }
            },
            { new: true }
        )

        const userPost = await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id }
            },
            { new: true }
        );

        if (!likedPost)
            return res.status(400).send("Post non trouvé");
        if (!userPost)
            return res.status(400).send("User non trouvé");

        return res.status(200).json(likedPost);

    } catch (err) {
        return res.status(400).send(err);
    }
}

//UNLIKE POST
module.exports.unlikePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);
}
