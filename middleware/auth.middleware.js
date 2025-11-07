const jwt = require("jsonwebtoken")
const UserModel = require("../models/user.model")

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.SECRET_TOKEN, async (error, decodedToken) => {
            if (error) {
                res.locals.user = null;
                res.cookie('jwt', '', { maxAge: 1 })
                next();
            } else {
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) =>{
            if(err){
                console.log(err);
                res.status(401).json({error: "Token invalide"});
            } else {
                console.log(decodedToken.id);
                next();
            }
        });
    } else {
        console.log("no token");
        res.status(401).json({error: "Accès refusé, token requis"});
    }
};