//项目前端js
$(function () {
    $('#sig-btn').on('click', function () {
        $('#sig').hide();
        $('#loa').show();
    });
    $('#loa-btn').on('click', function () {
        $('#loa').hide();
        $('#sig').show();
    });


    $('#or').on('click', function () {
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: 'api/user/res',
            data: {
                username: $('#user').val(),
                password: $('#pass').val(),
                repassword: $('#repass').val()
            },
            success: function (json) {
                console.log(json + 'weibo');
                if (json.code === 5) {
                    setTimeout(function () {
                        $('#loa').hide();
                        $('#sig').show();
                        $('#place1').hide();
                    }, 1000);
                    $('#place1').html('注册成功');
                } else {
                    $('#place1').html('注册失败');
                }
            },
            error: function (err) {
                console.log(err + 'err');
            },

        })
    });

    $('#log').on('click', function () {
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: 'api/user/log',
            data: {
                username: $('#inputEmail3').val(),
                password: $('#inputPassword3').val(),
            },
            success: function (json) {
                console.log(json + 'weibo');
                if (json.code === 8) {
                    window.location.reload();
                    // setTimeout(function () {
                    //     $('#loa-success').show();
                    //     $('#sig').hide();
                    //     $('#place').hide();
                    // },1000);
                    $('#place').html('登录成功');
                } else {
                    $('#place').html('登录失败');
                }

            },
            error: function (err) {
                console.log(err + 'err1');
            },
        })
    });

    $('#logout').on('click', function () {
        $.ajax({
            url: 'api/user/logout',
            success: function (json) {
                console.log(json);
                if (json.code === 9) {
                    window.location.reload();
                }
            }
        })
    });

    $('#category  li a').on('click', function () {
        var id = $(this).attr('nameid');
        $.ajax({
            url: '/name',
            type: 'post',
            dataType: 'json',
            data: {
                id: id
            },
            success: function (suc) {
                $('#boxs').html('');
                var limit = 2;
                var pages = Math.ceil(suc.length / limit);
                var page = 1;
                var txt = $("<div class=\"thumbnail main-foot text-center\">" +
                    "<i class=\"none1\" >没有上一页了</i> " +
                    "<i class=\"none2\"><a href=\"http://localhost:8086/name?id=suc.\">上一页</a></i>" +
                    "<span  class=\"none4\">没有下一页了</span>" +
                    "<span  class=\"none3\"><a href=\"http://localhost:8086/name?\">下一页</a></span>" +
                    "</div>");
                if (page === 1) {
                    $('.none2').hide();
                } else {
                    $('.none1').hide();
                }
                if (page === pages) {
                    $('.none3').hide();
                } else {
                    $('.none4').hide();
                }
                $("#boxs").append(txt);
                console.log(suc);
                for (var i = 0; i < suc.length; i++) {
                    var txt2 = $("<div class=\"thumbnail\"> <h3 class=\"text-center\">" + suc[i].title + "</h3>\n" +
                        "<span class=\"text-center\">作者：<em>admin</em>时间：<em>" + suc[i].date + "</em>阅读：<em>" + suc[i].read + "</em>评论：<em>" + suc[i].discuss.length + "</em></span>\n" +
                        "<p>" + suc[i].des + '</p><a href="read?id='+suc[i]._id+'">阅读全文</a>\n' +
                        "</div>");
                    $("#boxs").prepend(txt2);
                }
            },
            error: function (err) {
                console.log(err)
            }
        })
    })

});