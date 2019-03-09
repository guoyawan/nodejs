//发送接收前后端数据

var express = require('express');

var router = express.Router();//设置路由

var UserTable = require('../models/User');//引入建立的数据库

var article=require('../models/Article');

var respousetext = {};

router.use(function (req, res, next) {

    respousetext = {
        code: 0,
        sug: 'success'
    };
    next();
});//设置返回的属性值

router.post('/user/res', function (req, res) {

    //console.log(req.body+'body');

    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;

    if (username === '') {
        respousetext.code = '1';
        respousetext.sug = '用户名不能为空';
        res.send(respousetext);
        return;
    }

    if (password === '') {
        respousetext.code = '1';
        respousetext.sug = '密码不能为空';
        res.send(respousetext);
        return;
    }

    if (password != repassword) {
        respousetext.code = 3;
        respousetext.sug = '两次输入的密码不一致!';
        res.send(respousetext);
        return;
    }

    UserTable.findOne({
        username: username
    }).then(function (info) {

       // console.log(info+'&'+password);

        if (info) {
            respousetext.code = 4;
            respousetext.sug = '用户名已存在';
            res.send(respousetext);
            return;
        }else {
            //console.log('&'+password);
            var users = new UserTable({
                username:username,
                password:password
            });

            return users.save();
        }
    }).then(function (newInfo) {
        //console.log(newInfo+'newinfo');
        respousetext.code = 5;
        respousetext.sug = '注册成功';
        res.send(respousetext);
        res.end();
    })
});//注册用户，及对注册限制

router.post('/user/log', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if (username === '') {
        respousetext.code = 4;
        respousetext.sug = '用户名不能为空!';
        res.send(respousetext);
        return;
    }

    if (password === '') {
        respousetext.code = 6;
        respousetext.sug = '密码不能为空!';
        res.send(respousetext);
        return;
    }

    UserTable.findOne({
        username: username,
    }).then(function (info) {

      //console.log(info+'hr');//数据库数据调用

        if (!info) {
            respousetext.code = 7;
            respousetext.sug = '用户名不存在';
            res.send(respousetext);
            return;

        }else{
            respousetext.code = 8;
            respousetext.sug = '登陆成功';

            req.cookies.set('users',JSON.stringify({//种cook，users是设置的cookies的名字
                _id:info._id,//给cookies赋值
                username:info.username//给cookies赋值
            }));

            res.send(respousetext);
            res.end();

        }
    })
});//通过匹配数据库的数据，来验证用户是否存在，是否可以登录

router.get('/user/logout',function (req,res) {
    req.cookies.set('users',null);
    respousetext.code=9;
    res.send(respousetext);
    res.end();
});//清空cookies，恢复页面初始效果


module.exports = router;