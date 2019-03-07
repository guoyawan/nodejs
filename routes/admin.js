var express = require('express');

var router = express.Router();

var userdate = require('../models/User');

var fileTable=require('../models/File');

var article=require('../models/Article');

router.use(function (req,res,next) {
   // console.log(req.query+1);
    if (!req.users.isAdmin){
        res.send('404 页面不存在！');
        res.end();
    }
    next();
});

//用户列表管理
router.get('/', function (req, res) {

    var limit = 4;

    var page = Number(req.query.page) || 1;

    var skip = (page - 1) * limit;

    userdate.count().then(function (count) {

        userdate.find().limit(limit).skip(skip).then(function (infodata) {

            var pages = Math.ceil(count / limit);

            res.render('admin/admin.ejs', {
                Data: infodata,
                count: count,
                limit: limit,
                pages: pages,
                page: page
            });
        });
    })
});
//分类列表管理
router.get('/category', function (req, res) {

    fileTable.find().then(function (info) {

        res.render('./admin/category.ejs', {data: info});
    })
});
var json = {};
//分类列表删除
router.post('/category/del', function (req, res) {
    var id = req.body.id;
    fileTable.remove({_id: id}).then(function (info) {
        if (info) {
            json.code = 0;
            json.msg = '删除成功';
            res.send(json);
            return;
        }

    })
});
//分类列表修改
var revise = {};
router.post('/category/revise', function (req, res) {
    var name = req.body.name;
    var id = req.body.id;
    fileTable.findOne({
        _id:{$ne:id},
        name: name
    }).then(function (info) {
        console.log(info+1);
        if (info){
            revise.code = 10;
            revise.msg = '该类名存在';
            res.send(revise);
            return;
        } else{
            return fileTable.update({_id:id},{name:name})
        }
    }).then(function (newinfo) {
        if (newinfo){
            console.log(newinfo+2);
            revise.code = 1;
            revise.msg = '修改成功';
            res.send(revise);
        }

    })
});
//新增分类管理
router.get('/file',function (req,res) {
    res.render('./admin/file.ejs',{});
    res.end();
});
var jsons={};
//jsons初始值设置
router.use(function (req,res,next) {
    jsons={
        code:0,
        smg:'success'
    };
    next();
});
//分类添加
router.post('/file',function (req,res) {
    var name=req.body.name;
    fileTable.findOne({
        name:name
    }).then(function (info) {

        if (info){
            jsons.code=1;
            jsons.smg='分类名已存在';
            res.send(jsons);
            //console.log('json'+jsons);
            return;
        }

        var flies= new fileTable({
            name: name
        });
        // console.log(flies);

        return flies.save();
    }).then(function (newinfo) {
        res.send(jsons);
        res.end();
    });

});
//新增文章管理
router.get('/article',function (req,res) {

    fileTable.find().then(function (info) {
        //console.log(info);
        res.render('admin/article.ejs',{cate:info});

    });
});
//新增文章
router.post('/article/con',function (req,res) {
    var title=req.body.title;
    var des=req.body.des;
    var con=req.body.con;
    var sel=req.body.sel;
    var names=req.body.names;
    new  article({
        title: title,
        des:des,
        con:con,
        sel:sel,
        names:names
    }).save().then(function (info) {
        if (info){
            json.code=0;
            json.msg='发表成功';
            res.send(json)
        }
    })
});
//修改文章管理
router.get('/revise',function (req,res) {
    fileTable.find().then(function (info) {
        article.find().then(function (info2) {
            res.render('admin/reviseart.ejs',{cates:info,info2:info2});
        })
        //console.log(info);
    });
});
//删除文章
router.get('/revise/del',function (req,res) {
    // console.log(req);
    var id=req.query.id;
    console.log(id);
    article.remove({
        _id:id
    }).then(function (info) {
        res.redirect('/admin/revise');
    })
});

module.exports = router;