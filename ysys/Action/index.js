//添加所需要的公用方法模块
var Common = require('../Lib/common');

function index(response, request) {
    /*
       index方法：
       网站入口 http://localhost/
       同等于 http://localhost/index/index
       或 http://localhost/index/
    */
    console.log("已成功进入'index' 控制器的 'index' 方法 ");
    console.log("框架Conf/index.js配置文件：");
    console.log(CONFIG); //输出配置信息到控制台
    
    //输出对象到模版实例
    var users = [];
      users.push({'name':'进入index控制器的test方法','url':'/index/test','file':'Action/index.js'});
      users.push({'name':'进入upload控制器的index(默认)方法','url':'/upload','file':'Action/upload.js'});
      users.push({'name':'进入database的index方法','url':'/database','file':'Action/database.js'});
    //users ='就一条数据显示';
    Common.Viewtpl('index/index.html',users,response); // 模版放置在Tpl目录下
    /*
    //或用这种写的返回信息
    var str = Common.Viewtpl('index/index.html',users); //不传response参数过去
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(str);
    response.end();
    */
}
//映射这些方法到模块并重新命名
exports.index = index;

//也可以直接这样映射方法
exports.test =function(response, request) {
    //test方法： 访问地址 http://localhost/index/test/
    console.log("已成功进入'index' 控制器的 'test' 方法 ");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<a href='/'>Go back</a>");
    response.end();
}
