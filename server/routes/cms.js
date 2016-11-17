'use strict'

const express = require('express');
const router = express.Router();

const Cms = require('../controller/controller.cms');

router.get('/date/:DateSchema', Cms.readByDate )
router.get('/letter/:letter', Cms.readByLetter )
router.get('/' , Cms.readAll )
router.post('/' , Cms.createData )
router.put('/:id', Cms.updateData)
router.delete('/:id' , Cms.deleteData)
