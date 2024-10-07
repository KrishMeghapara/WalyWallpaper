const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    _id: String,
    url: String
})

const UserModel = mongoose.model("users",UserSchema)
module.exports = UserModel