const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

//GET ALL POST
module.exports.readPost = async (req, res) => {
    try {
        const posts = await PostModel.find().sort({ createdAt: -1 });//permet de trier les posts par date de création
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
    };

    try {
        const post = await PostModel.updateOne(
            { _id: req.params.id },
            { $set: updatedRecord }
        );

        return res.status(200).json(post);
    } catch (err) {
        return res.status(400).send(err);
    }
};

//DELETE POST
module.exports.deletePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);

    try {
        const deletedPost = await PostModel.deleteOne({ _id: req.params.id });
        return res.status(200).json(deletedPost);
    } catch (err) {
        return res.status(400).send(err);
    }
};

//LIKE POST
module.exports.likePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);
    //ajout du like au post
    try {
        const likedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id },
            },
            { new: true }
        );

        const userPost = await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id },
            },
            { new: true }
        );

        if (!likedPost) return res.status(400).send("Post non trouvé");
        if (!userPost) return res.status(400).send("Utilisateur non trouvé");

        return res.status(200).json(likedPost);
    } catch (err) {
        return res.status(400).send(err);
    }
};

//UNLIKE POST
module.exports.unlikePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);
    //retirer un like au post
    try {
        const likedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id },
            },
            { new: true }
        );

        const userPost = await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id },
            },
            { new: true }
        );

        if (!likedPost) return res.status(400).send("Post non trouvé");
        if (!userPost) return res.status(400).send("Utilisateur non trouvé");

        return res.status(200).json(likedPost);
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.commentPost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);

    try {
        const post = await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime(),
                    },
                },
            },
            { new: true }
        );

        if (!post) return res.status(400).send("Post non trouvé");
        return res.status(200).json(post);

    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.editCommentPost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);

    try {
        const post = await PostModel.findById(req.params.id);

            //commentaire a modifier
            const theComment = post.comments.find((comment) => {
                return comment._id.equals(req.body.commentId)
            })

            if (!post) return res.status(404).send("Post non trouvé")
            if (!theComment) return res.status(404).send("Commentaire non trouvé")

            // modif du commentaire
            theComment.text = req.body.text;
        
        //sauvegarde du post
        const updatedPost = await post.save()

        return res.status(200).json(updatedPost)

    } catch (err) {
        return res.status(400).send(err)
    }
};

module.exports.deleteCommentPost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);

    try {
        const post = await PostModel.findByIdAndUpdate(req.params.id, {
            $pull: {
                comments: {
                    _id: req.body.commentId
                }
            }
        })
        
        if (!post) return res.status(400).send("Post non trouvé")
        return res.status(200).json({post, message:"Commentaire " + req.body.commentId + " supprimé"})
    } catch (err) {
        return res.status(400).send(err)
    }
};
