var userSchema=require('../schemas/article');

var mongoose=require('mongoose');

module.exports=mongoose.model('article',userSchema);