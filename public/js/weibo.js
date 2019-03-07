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

});