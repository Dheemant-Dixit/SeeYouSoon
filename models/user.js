const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
console.log("models");
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});
//console.log("digvijay");

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
