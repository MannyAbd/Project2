const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

 const startSchema = new Schema({
   title:  String,
   author: String,
   body:   String,
   // comments: [{ body: String, date: Date }],
   // date: { type: Date, default: Date.now },
 });

const Start = mongoose.model('start', startSchema)
module.exports = Start
