'use strict'

const express = require('express');
const mongoose = require('mongoose');
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

    Users.register(new Users({ username : req.body.username }), req.body.password, (err, user) => {
        if (err) {
          return res.json({ error : err.message });
        }

        passport.authenticate('local')(req, res, () => {
          if (err) {
            res.status(404)
          }else {
            res.json(user)
          };
        });
    });

}

//==============

// login ======
//===========

let logIn = (req, res, next) => {

  passport.authenticate('local', {} , (err,user) => {
    if (err) {
      res.json({message:"your username or password enter false"})
    }else {
      const token = jwt.sign({
        username:user.username
      }, 'ajilantang' , { expiresIn : 60*60 })
      res.json({
        _id   : user._id,
        username : user.username,
        token : token
      })
    }
  })(req, res, next)

}

module.exports = {
  // cobaRegist    : cobaRegist,
  registration  : registration,
  logIn         : logIn,
  showUser      : showUser

}
