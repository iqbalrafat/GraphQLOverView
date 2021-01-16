const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name:String,
  genre:String,
  authorId:String
})
// we are now exporting a model, name is Book which will be the collection in MongoDb database
// then we defined that it will be look like bookSchema.
module.exports = mongoose.model('Book',bookSchema);