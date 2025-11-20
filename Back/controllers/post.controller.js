const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

const fs = require("fs");
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline)
const { uploadErrors } = require("../utils/errors.utils");

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

    let fileName;
    if (req.file !== null) {
        try {
            if (!req.file) return res.status(400).send("Aucune image reçue");

        console.log("Fichier reçu:", req.file);
        console.log("Type MIME:", req.file.mimetype);
        console.log("Taille:", req.file.size);

        if (req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpeg")
            throw Error("Format d'image non valide");

        if (req.file.size > 150000000) {
            throw Error("Image trop volumineuse");
        }

        // Créer le nom de fichier
        const filename = (req.body.name || 'default') + '.jpg';
        const uploadPath = `${__dirname}/../client/public/uploads/posts/`;
        const fullPath = uploadPath + filename;

        // Créer le dossier s'il n'existe pas
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        // Sauvegarder le fichier depuis le buffer
        fs.writeFileSync(fullPath, req.file.buffer);

        console.log("Fichier sauvegardé à:", fullPath);

        fileName = req.body.posterId + Date.now()+ ".jpg";

        let userPicture = null 
        if (req.body.userId) {
            userPicture = await UserModel.findByIdAndUpdate(
            req.body.userId,
            {
                $set: {
                    picture: "./uploads/posts/" + fileName
                }
            },
            
            { new: true }
        )}
        
    } catch (err) {
        return res.status(400).send(err);
    }
}


    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.file !== null ? "./uploads/posts/" + fileName : null,
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
