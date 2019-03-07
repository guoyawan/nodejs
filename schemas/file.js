//设计数据库

var mongoose=require('mongoose');

var schema=mongoose.Schema;

var files=new schema({

  name:String

});

module.exports=files;