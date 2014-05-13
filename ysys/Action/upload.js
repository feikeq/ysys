//添加所需要的额外模块
var fs = require("fs"),
    path = require('path'),
    formidable = require("formidable"); //模块node_modules文件夹的查找方法先是当前目录再是上一级目录
//添加所需要的公用方法模块
var Common = require('../Lib/common');


//映射入口index方法
exports.index =function(response, request) {
    console.log("已成功进入'upload' 控制器的 'index' 方法 ");
    // 模版放置在Tpl目录下
    var str = Common.Viewtpl('upload/upimg.htm','上传文件与表单测试',response); 
}


//upload接收上传文件的方法
function upload(response, request) {
  console.log("已成功进入'upload' 控制器的 'upload' 方法 ");
  console.log('当前页面的请求方法：'+request.method); // 'POST' or 'GET'
  
  if(request.method != 'POST'){
           response.writeHead(500, {"Content-Type": "text/plain"});
          response.write('No:' +request.method);
           response.end(); 
           return;
 }
          
    var form = new formidable.IncomingForm();
    form.uploadDir=CONFIG.SITE_UPLOADS;
    form.encoding = 'utf-8';
    
    
    if(!fs.existsSync(form.uploadDir)){
        fs.mkdirSync(form.uploadDir); //创建目录
    }
    
    
    form.parse(request, function(error, fields, files) {
        
        
        if(!files.photo.size) fs.unlink(files.photo.path); //删除为空时创建的临时文件
          
          
        if(error) {
          response.writeHead(500, {"Content-Type": "text/plain"});
          response.write(error + "\n");
          response.end();
        }else{
        
        
            console.log('----------接收到POST提交过来的值---------'); 
            console.log(fields); //字段
            console.log(files); //文件
            
            var util =  require('util'); //引入 util
            //输入内容到网页让大家看看哈。
            response.writeHead(200, {'content-type': 'text/plain'});
            response.write('received upload:\n\n');
            response.end(util.inspect({fields: fields, files: files}));
        }
 
    });
}
//映射这些方法到模块并重新命名
exports.gogogo = upload; //当然你也可以不用GOGOGO用upload如 exports.upload = upload;
 