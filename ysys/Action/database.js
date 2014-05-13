//添加所需要的公用方法模块
var Common = require('../Lib/common');


/*
--
-- 演示数据库的表结构 `game_cfg`
--
CREATE TABLE IF NOT EXISTS `game_cfg` (
  `gid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL DEFAULT '' COMMENT '游戏名称',
  `icon` varchar(255) DEFAULT '' COMMENT '图标',
  `type` tinyint(1) NOT NULL DEFAULT '1' COMMENT '类型',
  `note` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `intime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '插入时间',
  PRIMARY KEY (`gid`),
  UNIQUE KEY `title` (`title`),
  KEY `type` (`type`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='游戏表';

*/
//映射入口index方法
exports.index =function(response, request) {
    console.log("\n\n\n\n已成功进入'database' 控制器的 'index' 方法 ");
    // 模版放置在Tpl目录下
    var str = Common.Viewtpl('database/index.html','数据库操作',response); 
}



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

//映射test1方法
exports.test2 =function(response, request) {
    console.log("\n\n\n\n已成功进入'database' 控制器的 'test2 方法 ");
    console.log("插入新数据到库");
    updb = {'title':'切水果','type':1,note:'通过nodejs添加哈哈'};
     ret = Common.QuickDB('game_cfg',updb,'','',function(data){
          //成功后data为插入的ID 
          console.log(data);//输出结果到控制台 
          response.writeHead(200, {"Content-Type": "text/plain"});
          response.end('因为没做别的处理，去控制台console看结果吧'); 
     });
}

//映射test3方法
exports.test3 =function(response, request) {
    console.log("\n\n\n\n已成功进入'database' 控制器的 'test3 方法 ");
    console.log("修改数据");
    updb = {'title':'切水果','type':2,note:'哈哈通过nodejs修改'};
     ret = Common.QuickDB('game_cfg',updb,"`title`='切水果'",'',function(data){
          console.log(data);//输出结果到控制台 
          response.writeHead(200, {"Content-Type": "text/plain"});
          response.end('因为没做别的处理，去控制台console看结果吧'); 
     });
}
 