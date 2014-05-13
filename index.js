/**
 * YSYS_nojs v0.1
 * @date 2014-05-13
 *
 * Copyright 2014, FeikeWorld - http://www.fk68.net
 * @author feikeq
 *
 * 使用方法在控制台输入“node index”即可运行，然后访问 http://x.x.x:8888
 * 日志方法为 nohup node index 1>log.txt & 

 
 */
 
// 定义云上元素YSYS框架目录
var YSYS_PATH ='./ysys/';
// 加载启动YSYS框架
require(YSYS_PATH+'Lib').run(8888); //开启8888端口的HTTP服务不写则为80端口
