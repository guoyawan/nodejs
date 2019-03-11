//渲染主页面

var express = require('express');

var router = express.Router();

var fileTable = require('../models/File');

var article = require('../models/Article');

router.get('/', function (req, res) {

    var limit = 5;

    var page = Number(req.query.page) || 1;

    var skip = (page - 1) * limit;

    fileTable.find().then(function (info) {

        article.count().then(function (count) {

            article.find().limit(limit).skip(skip).then(function (newinfo) {
                var pages = Math.ceil(count / limit);

                res.render('main/weibo.ejs', {
                    usersinfo: req.users,
                    datas: info,
                    con: newinfo,
                    pages: pages,
                    page: page

                });
            });
        })
    });
});
//阅读页面渲染
router.get('/read', function (req, res) {
    console.log(req.user);
    var id = req.query.id;
    fileTable.find().then(function (info) {
        article.findOne({
            _id: id
        }).then(function (newinfo) {
            newinfo.read++;
            newinfo.save();
            res.render('main/reading.ejs', {
                usersinfo: req.users,
                datas: info,
                con: newinfo,
            });
        });
    });
});
//评论
router.post('/read/msg',function (req,res) {
    var id=req.body.id;
    var discuss=req.body.discuss;
    var username=req.body.username;
    article.findOne({
        _id:id
    }).then(function (info) {
        info.discuss.push({
            username:username,
            content:discuss,
            time:new Date()
        });
        return info.save();
        console.log(info+'info');
    }).then(function (info2) {
        res.send(info2.discuss);
        res.end();
    })
});

router.post('/name',function (req,res) {
    var id=req.body.id;

  article.find({
      sel:id
  }).then(function (info) {
      console.log(info);
      res.send(info);
      res.end();
  })
});

module.exports = router;