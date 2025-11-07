const mongoose = require("mongoose");
const { trim } = require("validator");


const PostSchema = new mongoose.Schema({
    
posterId: {
    type: String,
    required: true
},

message: {
    type: String,
    trim: true,
    maxlength: 500,
},

picture: {
    type: String,
},

video: {
    type: String,

},

likers: {
    type: [String],
    required: true,
},

comments: {
    type: {
        commentersId: String,
        commenterPseudo: String,
        text: String,
        timestamp: Date,
    },
    required: true,
},

},
{timestamps: true},

)

module.exports = mongoose.model("Post", PostSchema);