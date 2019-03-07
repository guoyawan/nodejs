//建立后端数据库

var userSchema=require('../schemas/file');

var mongoose=require('mongoose');

module.exports=mongoose.model('files',userSchema);