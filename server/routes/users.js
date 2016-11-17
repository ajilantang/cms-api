'use strict'

const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../controller/controller.user');
/*
GET users login and registration.
*/



router.get('/', User.showUser)

router.post('/register',User.registration)

router.post('/login', passport.authenticate('local'), User.logIn)

module.exports = router;
