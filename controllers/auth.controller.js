const UserModel = require("../models/user.model")
const {signUpErrors, signInErrors} = require("../utils/errors.utils")
const jwt = require("jsonwebtoken")

const maxAge = 1 * 24 * 60 * 60*1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_TOKEN, {expiresIn: maxAge})
};

// CREATION D'UN UTILISATEUR
module.exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body

    try {
        const user = await UserModel.create({pseudo, email, password});
        res.status(201).json({user: user._id, message: "Inscription reussie"});
    } 
    catch(err) {
        const errors = signUpErrors(err);
        res.status(200).send({ errors })
    }
}

// CONNEXION D'UN UTILISATEUR
module.exports.signIn = async (req, res ) => {
    const {email, password} = req.body

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge})
        res.status(200).json({user: user._id, message: "Connexion reussie"})

    } catch (err) {
        const errors = signInErrors(err);
        res.status(200).send({errors})
    }
}

module.exports.logout = async (req, res) => {
    res.cookie("jwt", "", {maxAge: 1});
    res.status(200).json({user: req.userId, message: "Déconnexion reussie"})
}