var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var article=new Schema({
    title:{//标题
        type:String,
        default:''
    },
    date:{//时间
        type: Date,
        default: new Date()
    },
    discuss:{//评论
        type:Array,
        default:[]
    },
    con:{//内容
       type:String,
       default:''
    },
    read:{//阅读量
        type:Number,
        default:0
    },
    sel:{//分类
        type:mongoose.Schema.Types.ObjectId,
        ref:'File'
    },
    des:{//简介
        type:String,
        default:''
    },
    names:{
        type:String,
        default:''
    }
});
module.exports=article;