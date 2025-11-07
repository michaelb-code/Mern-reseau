

module.exports.signUpErrors = (err) => {
    let errors = {pseudo: "", email: "", password: ""};

    if(err.message.includes("pseudo"))
        errors.pseudo = "Pseudo incorrect ou déjà pris.";

    if(err.message.includes("email"))
        errors.email = "Email incorrect ou déjà pris.";

    if(err.message.includes('password'))
        errors.password = "Le mot de passe doit contenir au moins 6 caractères.";

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
        errors.pseudo = "Cet Pseudo est déjà pris.";

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
        errors.email = "Cet Email est déjà enregistré.";

    return errors;
};

module.exports.signInErrors = (err) => {
    let errors = {email: "", password: ""};

    if(err.message.includes("Email incorrect"))
        errors.email = "Email inconnu.";

    if(err.message.includes("Mot de passe incorrect"))
        errors.password = "Mot de passe incorrect.";

    return errors;
}
