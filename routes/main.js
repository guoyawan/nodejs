//渲染主页面

var express=require('express');

var router=express.Router();

var fileTable=require('../models/File');

var article=require('../models/Article');


router.get('/',function (req,res) {

    var limit = 5;

    var page = Number(req.query.page) || 1;

    var skip = (page - 1) * limit;

    fileTable.find().then(function (info) {

        article.count().then(function (count) {

           article.find().limit(limit).skip(skip).then(function (newinfo) {

                var pages = Math.ceil(count / limit);

                res.render('main/weibo.ejs',{
                    usersinfo: req.users,
                    datas:info,
                    con:newinfo,
                    pages: pages,
                    page: page

                  });
                });
            })
        });
});
module.exports =router;