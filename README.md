# YSYS

YSYS云上元素Node.js开发框架(MVC)
代码仓库地址[YSYS](http://github.com/feikeq/ysys)

## 介绍

YSYS是一个免费开源的，快速、简单的面向对象的轻量级Node.js开发框架，是为了敏捷WEB应用开发和简化企业应用开发而诞生的。
 

## 目录结构

 * 目录/文件	               说明
 * -----------------------------------------------------------
 * index.js	                  框架入口文件(可重命名)
 *   ├── Action	              控制器文件目录
 *   ├── Conf	                框架配置文件目录
 *   ├── Lib	                框架核心基类库目录
 *        └─┌── Lib/index.js  框架HTTP服务
 *          ├── Lib/router.js 框架路由
 *          └── Lib/common.js 公用方法模型
 *   ├── Tpl	                模板目录
 *   └── node_modules	        框架扩展目录(可自行添加新的模块)
 


# URL模式

框架应用采用单一入口文件来执行，因此网站的所有的模块和操作都通过URL的参数来访问和执行。
这样一来，传统方式的文件入口访问会变成由URL的参数来统一解析和调度。

index.js 和 function index() 为默认入口

例在 Action 目录下有 abc.js 
那它的访问地址为 http://localhost/abc/ 或 http://localhost/abc/index
因为这个地址指向的默认方法为index方法
如你abc.js里有exports映射 gogogo 方法 那要访问这个方法地址应该是
http://localhost/abc/gogogo
以此类推

例：
function index(response, request) {
      //index方法：
      // 网站入口 http://localhost/
      // 同等于 http://localhost/index/index
      // 或 http://localhost/index/
   
    console.log("已成功进入'index' 控制器的 'index' 方法 ");
    console.log("框架Conf/index.js配置文件：");
    console.log(CONFIG); //输出配置信息到控制台
    
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('入口入口入口入口');
    response.end();
}
//映射这些方法到模块并重新命名
exports.index = index;

 
## 入口文件index.js
   你可以重命名成你喜欢的名字如app.js
   // 定义云上元素YSYS框架目录
   var YSYS_PATH ='./ysys/';
   // 加载启动YSYS框架
   require(YSYS_PATH+'Lib').run(8888); //开启8888端口的HTTP服务不写则为80端口
    
    
## 使用方法

 在控制台输入“node index”即可运行，然后访问 http://x.x.x:8888
 要后台运行并且保存日用这命令 nohup node index 1>log.txt & 


## 模板

    //添加所需要的公用方法模块
    var Common = require('../Lib/common');
    Common.Viewtpl('index/index.html',{要输入的对象},response); // 模版放置在Tpl目录下
    //或用这种写的返回信息
    var str = Common.Viewtpl('index/index.html',users); //不传response参数过去
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end(str);
    
    具体模板变量等逻辑组合请参考 node_modules\ejs\Readme.md 帮助

## 数据库

  //添加所需要的公用方法模块
  var Common = require('../Lib/common');
  Common.QuickDB($tabname,$data_arrstr,$where_str,$DESCGROUP,Callback);
  - `$tabname`           表名（必选）
  - `$data_arrstr`       字段对像或字符（可选）
  - `$where_str`         条件语句（可选）
  - `$DESCGROUP`         排序或分组或LIMIT等 
  - `Callback`           回调方法
  

  // 有$data_arrstr(数组) 和      $where_str 时是更新数据 UPDATE 改
  //  有$data_arrstr(数组) 没有    $where_str 时是插入数据 INSERT 增
  //没有$data_arrstr(字符) 有或没  $where_str 时是查询数据 SELECT 查或 count 统计
  
  
  例：
  //映射test1方法
exports.test1 =function(response, request) {
    console.log("\n\n\n\n已成功进入'database' 控制器的 'test1 方法 ");
    console.log("查询数据库");
     ret = Common.QuickDB('game_cfg','*',"`title`='切水果'",'ORDER BY  `gid` DESC',function(data){
          console.log(data);//输出结果到控制台
          response.writeHead(200, {"Content-Type": "text/plain"});
          response.end('因为没做别的处理，去控制台console看结果吧'); 
     });
}


## 配置文件
文件在框架目录下的Conf/index.js文件里，不用多说什么你看得懂的，呵。

global.CONFIG = {
  //服务器相关配置可自行添加
  'SITE_NAME':'YSYS云上元素Node.js服务器框架',
  'COOKIE_DOMIN' : '127.0.0.1', //cookie域
  'SITE_UPLOADS' : 'uploads/', //上传文件地址
  //MySql数据库配置
  MYSQL : {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'test', //库名
      dateStrings: false
  }
};
  
  
## 就写这么多吧，写文档太累
  YSYS_nojs v0.1
  @date 2014-05-13
  Copyright 2014, FeikeWorld - http://www.fk68.net
  @author feikeq
  Node.js交流QQ群：12834508  
  
  [提笔记](http://www.tibiji.com/?from=nodjs)
 
 
## 其它帮助

通过 Apache 代理访问 Node：
-----------------------------------------------------------------
针对服务器上已经有了 apache 和 Node 同时想把域名的 80 端口给 Node 使用做到两者兼顾 。
原理就是使用 Apache 做代理服务器，也就是使 Node 和 Apache 在一个服务器上同时提供服务，并且都只使用域名而不用加端口号:

那么就来看，如何实现：

1.在 Apache 的配置conf/httpd.conf文件中，开启 mod_proxy 和 mod_proxy_http 这两个模块：
#LoadModule proxy_module modules/mod_proxy.so
#LoadModule proxy_http_module modules/mod_proxy_http.so
也就是去掉这两行前面的 # 号即可。(如果这些模块已经内置了就不用手动加载)

2.配置虚拟主机，conf/vhosts.conf文件里增加下面的代码：
<VirtualHost *:80>
   ServerName node.js
   ServerAlias www.node.js
   ProxyRequests off

   <Proxy *>
     Order deny,allow
     Allow from all
   </Proxy>

  <Location />
   ProxyPass http://localhost:8888/
   ProxyPassReverse http://localhost:8888/
  </Location>
</VirtualHost>

注意：
    此处 node.js 和 www.node.js 为绑定的要访问 Node 服务的域名。
    第一行的<VirtualHost *:80>中的*号如不管用就填服务器的IP地址。(我用的是IP地址)
    http://localhost:8888/ 为服务器上访问 Node 的网址和端口号，这里以 8888 为例。

2.运行你的 Node 服务，然后重启 Apache ，访问你的域名这时候你就可以看到用 Node 提供服务的网站了。

(备注：如果使用的是 Nignx 的话，也可以用同样的原理来实现，但是我只用了 Apache ，就没有尝试着去做 Nignx。当然了，其他服务器也一样。)

