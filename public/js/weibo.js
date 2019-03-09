//项目前端js
$(function () {
    $('#sig-btn').on('click',function () {
        $('#sig').hide();
        $('#loa').show();
    });
    $('#loa-btn').on('click',function () {
        $('#loa').hide();
        $('#sig').show();
    });


    $('#or').on('click',function () {
        $.ajax({
            type:'post',
            dataType:'json',
            url:'api/user/res',
            data:{
                username:$('#user').val(),
                password:$('#pass').val(),
                repassword:$('#repass').val()
            },
            success:function (json) {
                console.log(json+'weibo');
                    if (json.code===5) {
                        setTimeout(function () {
                            $('#loa').hide();
                            $('#sig').show();
                            $('#place1').hide();
                        },1000);
                        $('#place1').html('注册成功');
                    }else{
                       $('#place1').html('注册失败');
                    }
            },
            error:function (err) {
                console.log(err+'err');
            },

        })
    });

    $('#log').on('click',function () {
        $.ajax({
            type:'post',
            dataType:'json',
            url:'api/user/log',
            data:{
                username:$('#inputEmail3').val(),
                password:$('#inputPassword3').val(),
            },
            success:function (json) {
                console.log(json+'weibo');
                    if (json.code===8){
                        window.location.reload();
                        // setTimeout(function () {
                        //     $('#loa-success').show();
                        //     $('#sig').hide();
                        //     $('#place').hide();
                        // },1000);
                        $('#place').html('登录成功');
                    }else{
                        $('#place').html('登录失败');
                    }

            },
            error:function (err) {
                console.log(err+'err1');
            },
        })
    });

    $('#logout').on('click',function () {
        $.ajax({
            url:'api/user/logout',
            success:function (json) {
                console.log(json);
                if (json.code===9){
                    window.location.reload();
                }
            }
        })
    });

    $('#category  li a').on('click',function () {
        var id=$(this).attr('nameid');
        $.ajax({
            url:'/name',
            type:'post',
            dataType:'json',
            data:{
                id:id
            },
            success:function (suc) {
                $('#boxs').html('');
                console.log(suc);
                for (var i=0;i<suc.length;i++){
                    var txt2=$("<div class=\"thumbnail\"> <h3 class=\"text-center\">"+suc[i].title+"</h3>\n"+
                        "<span class=\"text-center\">作者：<em>admin</em>时间：<em>"+suc[i].date+"</em>阅读：<em>"+suc[i].read +"</em>评论：<em>"+suc[i].discuss.length+"</em></span>\n" +
                        "<p>"+ suc[i].des+"</p>\n"+
                        "<a href=\"http://localhost:8086/read?id='+con[i]._id+'\" class=\"btn or\" role=\"button\">阅读全文</a>\n" +
                        "</div>");
                    $("#boxs").prepend(txt2);
                }
            },
            error:function (err) {
                console.log(err)
            }
        })
    })

});