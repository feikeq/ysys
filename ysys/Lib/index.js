var Conf = require('../Conf'); //引入配置
var routers = require('./router'); //引入自定义路由模块
var http = require('http'); //引入内置模块HTTP
//console.log(module.paths);
function start_fun(port){
    port || (port = 80); //设置初始端口为80
    http.createServer(function (request, response) {
      //手动设置字符编码指为UFT-8编码 (当为文件时会导致formidable解析出错!!!!)
      //request.setEncoding('utf8');
      //response.writeHead(200, {'Content-Type': 'text/plain'});
      //response.end('Hello World\n');
      routers.router( response, request); //用路径来激活不同的控制器方法 
    }).listen(port); //开启端口监听
    console.log(CONFIG.SITE_NAME+'已成功启动！\n服务器端口:'+port);
    //console.log('当前路径:'+ __filename);
}
exports.run = start_fun; //映射start_fun这个方法到模块并命名为start