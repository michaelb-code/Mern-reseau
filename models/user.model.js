const mongoose = require("mongoose");
const {isEmail} = require("validator")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    
    pseudo:{
        type: String,
        required: true,
        minLenght: 5,
        maxLenght: 50,
        unique: true,
        trim: true
    },

    email : {
        type :String,
        required: true,
        unique : true,
        validate : [isEmail],
        lowerCase : true,
        trim : true

    },

    password :{
        type:String,
        required: true,
        max: 1024,
        minLenght: 6
    },

    picture:{
        type: String,
        default: "./uploads/profil/random-user.png"
    },

    bio: {
        type: String,
        maxLenght: 1024
    },

    followers:{
        type: [String],
    },

    following:{
        type: [String],
    },

    likes: {
        type : [String],
    },
    
},
{
    timestamps: true,
}

)

// FONCTION AVANT D'ENREGISTRER EN DB
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password =await bcrypt.hash(this.password, salt);
    next();
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel
