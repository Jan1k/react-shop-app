const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Post = new Schema({
    imageURL: {
        type: String
    },
    text: {
        type: String,
    },
    description: {
        type: String,
    },
    date: {
        type: String,
    }
});

module.exports = mongoose.model("Post", Post);