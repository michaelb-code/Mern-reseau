const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = async (req, res) => {
  try {console.log(req.params);
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id) //controle si l'id est valide

//  ATTENTION  avec la version de mongoose RECENT JE NE PEUX PAS UTILISER DE CALL BACK COMME DANS LA VIDEO il faut utiliser la syntaxe Promise / async-await. 
const user = await UserModel.findById(req.params.id).select("-password");

if(!user) {
    return res.status(404).send("Utilisateur non trouvé")
}

res.status(200).json(user)
  }
catch(err) {
    console.error("Erreur lors de la récuperation de l'utilisateur : " + err)
    res.status(500).send("Erreur serveur")
}
};
