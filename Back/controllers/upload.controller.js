const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline)
const { uploadErrors } = require("../utils/errors.utils");

module.exports.uploadProfil = async (req, res) => {
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
        const uploadPath = `${__dirname}/../client/public/uploads/profil/`;
        const fullPath = uploadPath + filename;

        // Créer le dossier s'il n'existe pas
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        // Sauvegarder le fichier depuis le buffer
        fs.writeFileSync(fullPath, req.file.buffer);

        console.log("Fichier sauvegardé à:", fullPath);

        let userPicture = null 
        if (req.body.userId) {
            userPicture = await UserModel.findByIdAndUpdate(
            req.body.userId,
            {
                $set: {
                    picture: "./uploads/profil/" + filename
                }
            },
            
            { new: true }
        )}

        return res.status(201).json({
            message: "Image téléchargée avec succès",
            filename: filename,
            originalname: req.file.originalname,
            size: req.file.size,
            mimetype: req.file.mimetype,
            path: `./uploads/profil/${filename}`
        });

    } catch (err) {
        console.error("Erreur upload:", err);
        const errors = uploadErrors(err);
        return res.status(400).json({ errors });

    }

};