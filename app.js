//建立前后端联系(所有请求)
var express=require('express');//express模块引入

var app=express();

var ejs=require('ejs');

var admin=require('./routes/admin');//引入其它js文件

var api=require('./routes/api');

var main=require('./routes/main');

var mongoose=require('mongoose');//mongoose模块：数据库中间件

var bodyparser=require('body-parser');//主体解析模块

var cookies=require('cookies');//cookies数据储存模块

var userTable=require('./models/User');

app.set('html','view engine');//用于render页面渲染 设置文件类型 可视引擎

app.set('views','./tpl');//用于render页面渲染，设置 可视窗口，要渲染的ejs的路径

app.engine('html',ejs.renderFile);//用于render页面渲染.输出html页面，用ejs渲染文件

app.use(function (req,res,next) {//设置cookies

    req.cookies =new cookies(req,res);//给cookies赋值；

    req.users={};//在请求里添加一个属性

   // console.log(req.cookies.get('users')+'cookies');

    if (req.cookies.get('users')){//判断是否获取到种下的cookies
        try{
            req.users=JSON.parse(req.cookies.get('users'));

            userTable.findById(req.users._id).then(function (x) {

                req.users.isAdmin=x.isAdmin;
                next();
            })
        }catch(e){
            console.log(e+'e');
            next();
        }
    }else{
        next();
    }
});

app.use(bodyparser.urlencoded({extended:true}));//主体解析模块扩展与限制

app.use('/public',express.static(__dirname+'/public'));//静态托管页面 托管public下的所有的文件

app.use('/admin',admin)//8086/admin/login

app.use('/api',api)//8086/api/api

app.use('/',main)//8086/main

mongoose.connect('mongodb://localhost:27018/blog',function (err) {
    err?console.log(err):app.listen(8086);

});