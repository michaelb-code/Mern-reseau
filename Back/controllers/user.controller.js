const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

// GET ALL USERS
module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select("-password");
    res.status(200).json(users);
};

// GET USER INFO (pour récuperer les informations d'un utilisateur)
module.exports.userInfo = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id))
            return res.status(400).send("ID inconnu : " + req.params.id); //controle si l'id est valide

        //  ATTENTION  avec la version de mongoose RECENT(8.19.2) JE NE PEUX PAS UTILISER DE CALL BACK COMME DANS LA VIDEO il faut utiliser la syntaxe Promise / async-await.
        const user = await UserModel.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).send("Utilisateur non trouvé");
        }

        res.status(200).json(user);
    } catch (err) {
        console.error("Erreur lors de la récuperation de l'utilisateur : " + err);
        res.status(500).send("Erreur serveur");
    }
};

//UPDATE USER (mise a jour des infos de l'utilisateur)

module.exports.updateUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);

    try {
        const UpdatedUser = await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    bio: req.body.bio,
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).select("-password");

        if (!UpdatedUser) {
            return res.status(404).send("Utilisateur non trouvé");
        }
        res.status(200).json(UpdatedUser);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

//DELETE USER (supprimer un utilisateur)
module.exports.deleteUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);
    try {
        const deletedUser = await UserModel.findByIdAndDelete({
            _id: req.params.id,
        }).exec();
        if (!deletedUser) {
            return res.status(404).send("Utilisateur non trouvé");
        }
        res.status(200).json({ message: "Utilisateur supprimé" });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

//FOLLOW USER (suivre un utilisateur)
module.exports.followUser = async (req, res) => {
    if (
        !ObjectId.isValid(req.params.id) ||
        !ObjectId.isValid(req.body.idToFollow)
    )
        return res.status(400).send("ID inconnu : " + req.params.id);

    try {
        //ajouter un utilisateur à la liste de following
        const user = await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow } },
            { new: true }
        );

        //ajouter un utilisateur dans la liste de followers
        const follower = await UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id } },
            { new: true }
        );

        if (!user) {
            return res.status(404).send("Utilisateur non trouvé");
        }
        if (!follower) {
            return res.status(404).send("Utilisateur non trouvé");
        }

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

//UNFOLLOW USER (ne plus suivre un utilisateur)
module.exports.unfollowUser = async (req, res) => {
    if (
        !ObjectId.isValid(req.params.id) ||
        !ObjectId.isValid(req.body.idToUnfollow)
    )
        return res.status(400).send("ID inconnu : " + req.params.id);

    try {
        //retire un utilisateur à la liste de following
        const user = await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnfollow } },
            { new: true }
        );

        //retire un utilisateur dans la liste de followers
        const follower = await UserModel.findByIdAndUpdate(
            req.body.idToUnfollow,
            { $pull: { followers: req.params.id } },
            { new: true }
        );

        if (!user) {
            return res.status(404).send("Utilisateur non trouvé");
        }
        if (!follower) {
            return res.status(404).send("Utilisateur non trouvé");
        }

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error });
    }
};
