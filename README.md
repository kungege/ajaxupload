# ajaxupload
ajax异步上传文件
## 要点
* 创建FormData，放入待上传文件
* 通过xhr操作将FormData发送到服务器，实现文件上传
* 绑定progress、load、error等事件监听传输过程并在页面显示动态交互信息