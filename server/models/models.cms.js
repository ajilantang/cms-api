'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cmsSchema = new Schema ({
  letter      : String,
  frequency   : Number,
  DateSchema  : String

})

let cms = mongoose.model('cms', cmsSchema);

module.exports = cms
