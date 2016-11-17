'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new Schema ({
  username : String,
  password : String
})

userSchema.plugin(passportLocalMongoose)
let users = mongoose.model('users', userSchema);

module.exports = users;
