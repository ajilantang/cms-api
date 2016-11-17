'use strict'

const express = require('express');
const Cms = require('../models/models.cms');

/*

read all
read by Date
read by letter

*/

let readAll = (req, res) => {

  Cms.find({},(err,cms) => {
    if (err) {
      res.status(404).json({message:"theere is no data on your cms"})
    }else {
      res.status(200).json(cms)
    }
  })

}

let readByDate = (req,res) => {

  Cms.findOne({DateSchema:req.params.DateSchema}, (err,cms) => {
    if (err) {
      res.status(404).json({message:"there is no data"})
    }else {
      res.status(200).json(cms)
    }
  })
}


let readByLetter = (req,res) => {

  Cms.findOne({letter:req.params.letter}, (err,cms) => {
    if (err) {
      res.status(404).json({message:"there is no data"})
    }else {
      res.status(200).json(cms)
    }

  })

  /*
  create data

  */

  let createData = (req,res) => {

    Cms.create({
      letter      : String,
      frequency   : Number,
      DateSchema  : new Date()
    }, (err, cms) => {
      if (err) {
        res.status(404).json({message:"error"})
      }else {
        res.status(200).json(cms)
      }
    })

  }

  /*
  update data

  */

  let updateData = (req,res) => {
    Cms.findByIdAndUpdate(req.params.id , req.body ,(err,cms) => {
        if (err) {
          res.status(404).json({message:"failed to update"})
        }else {
          res.status(200).json(cms)
        }
    })
  }

/*
delete data
*/

let deleteData = (req,res) =>. {

  Cms.findByIdAndRemove( req.params.id,(err,cms) => {
    if (err) {
      res.status(404).json({message:"failed to remove"})
    } else {
      res.status(200).json(cms)
    }
  })

}

module.exports = {

  deleteData  : deleteData,
  updateData  : updateData,
  createData  : createData,
  readAll     : readAll,
  readByDate  : readByDate,
  readByLetter: readByLetter

}
