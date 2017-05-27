        function upload() {
            var fd = new FormData();
            fd.append("myfile",$("#myfile")[0].files[0]);
            var xhr = new XMLHttpRequest();
            //监听状态，实时响应 upload.onprogress处理上传进度
            xhr.upload.onprogress = function (event) {
                if(event.lengthComputable){
                    var percent = Math.round(event.loaded *100 / event.total);
                    console.log('%d%',percent);
                    $("#upprog").text(percent);
                }
            };
            //传输开始
            xhr.onloadstart = function (event) {
                console.log('开始上传');
                $("#upprog").text('开始上传');
                $("#stopbtn").one('click',function () {
                    xhr.abort();
                    $(this).hide();
                });
                loading(true);
            };
            //AJAX完成时事件
            xhr.onload = function (event) {
                console.log('上传成功');
                $("#upprog").text('上传成功');
                console.log(xhr.responseText);
                var ret = JSON.parse(xhr.responseText);
                addToFlist(ret.fname);
            };
            xhr.error = function (event) {
                console.log('发生错误');
                $("#upprog").text('发生错误');
            };
            xhr.onabort = function (event) {
                console.log('操作被取消');
                $("#upprog").text('操作被取消');
            };
            xhr.onloadend = function (event) {
                console.log('传输结束');
                loading(false);
            };
            xhr.open('POST','/upload',true);
            xhr.send(fd);
        }
        function  loading(showloading) {
            if(showloading){
                $("#uptxt").show();
                $("#stopbtn").show();
            }else {
                $("#uptxt").hide();
                $("#stopbtn").hide();
            }
        }