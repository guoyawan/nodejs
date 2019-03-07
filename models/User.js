//建立后端数据库

var userSchema=require('../schemas/users');

var mongoose=require('mongoose');

module.exports=mongoose.model('user',userSchema);