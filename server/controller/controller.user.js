'use strict'

const express = require('express');
const Users = require('../models/models.user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

let jwt = require('jsonwebtoken');
let ejwt = require('express-jwt');
/*
just checking for user
*/

let showUser = (req,res) => {
  Users.find({} , (err,user) => {
    if (err) {
      res.status(404)
    }else {
      res.json(user)
    }
  })
}

//===================
// registration ====
//=================

let registration = (req,res,next) => {
console.log(req.body.email);
  Users.register({
    email : req.body.email,
  }, req.body.password ,(err, user) => {
    if (err) {
      console.log("err");
      res.send({message: "your registration was failed"})
    } else {
      passport.authenticate('local')(req ,res , () => {
        res.status(200).json(user)
      })
    }
  })

}

//==============
// login ======
//===========

let logIn = (req, res, next) => {

  passport.authenticate('local', {} , (err,user) => {
    if (err) {
      res.json({message:"your email or password enter false"})
    }else {
      const token = jwt.sign({
        email:user.email
      }, 'ajilantang' , { expiresIn : 60*60 })
      res.json({
        _id   : user._id,
        email : user.email,
        token : token
      })
    }
  })(req, res, next)

}

module.exports = {

  registration  : registration,
  logIn         : logIn,
  showUser      : showUser

}
