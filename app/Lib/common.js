//添加所需要的额外模块
var path = require('path');
var ejs = require('ejs');
var fs = require('fs');
var mysql      = require('mysql');


/* QuickDB为数据库操作模型 */
exports.QuickDB =function ($tabname, $data_arrstr, $where_str, $DESCGROUP, Callback)
{
 
    //  有$data_arrstr(数组) 和      $where_str 时是更新数据 UPDATE 改
    //  有$data_arrstr(数组) 没有    $where_str 时是插入数据 INSERT 增
    //没有$data_arrstr(字符) 有或没  $where_str 时是查询数据 SELECT 查或 count 统计
    $tabname || ($tabname = ''); //初始化
    $data_arrstr || ($data_arrstr = '*'); //初始化
    $where_str || ($where_str = ''); //初始化
    $DESCGROUP || ($DESCGROUP = ''); //初始化
    
    if(!$tabname) return '$tabname 不能为空';
    var err_str ='';
    var $val ='',$db_key='',$db_val='',$edit_sql='', $checksql='';
    
    var connection = mysql.createConnection(CONFIG.MYSQL);
    console.log('正在连接数据库：');
    console.log(CONFIG.MYSQL);
    
     
    connection.connect(function(err) {
      if (err) {
        err_str ='数据库连接错误!';
        console.log(err_str + err.stack);
        console.log(err.code); // 'ECONNREFUSED'
        console.log(err.fatal); // true
        return false;
      }
      console.log('连接数据库成功connected as id :' + connection.threadId);
    });
    
    
 
    
    if(typeof  $data_arrstr === 'object'){
         console.log('[修改或插入数据库]');
         $i = '';
         for(var key in $data_arrstr) {
              if (!$where_str) {
                  $db_key += $i + ' `' + key +'`';
                  $db_val += $i + " '" + $data_arrstr[key] +"'";
              }else{
                  $val += $i+ " `" + key +"`='"+$data_arrstr[key]+"'";
              }
              $i = ',';
         }
         if (!$where_str) {
              $edit_sql = "INSERT INTO `"+ $tabname +"` ("+$db_key+") VALUES ("+$db_val+") ;";
         }else{
              $where_str = ' AND ' + $where_str;
              $edit_sql  = "UPDATE `"+ $tabname +"` SET "+ $val +" WHERE ( 1=1 "+ $where_str +" ) ;";
         }
         console.log($edit_sql); 
         
         
          
         
          
         connection.query($edit_sql, function(err, rows, fields) {
              if (err){
                 var err_str ='[修改或插入数据库失败]';
                 console.log(err_str+err);
                 connection.end(); 
                 if( Callback ) Callback(false); 
                 return false;
              }
              console.log('[操作数据库成功]');
              //console.log(rows);
              connection.end(); 
              if( Callback ) Callback(rows.insertId); 
              return rows.insertId;
          });
          
          
    
    }else{
    
          console.log('[查询数据库]');
          if($where_str) $where_str = ' AND ' + $where_str;
          $checksql  = "SELECT "+$data_arrstr+" FROM `"+ $tabname +"` WHERE ( 1=1 "+ $where_str +" ) "+ $DESCGROUP +" ;";
          console.log($checksql);
          
          connection.query($checksql, function(err, rows, fields) {
                      console.log('[查询成功]');
                      var $result ='';
                      if (err){
                         var err_str ='[数据库查询失败]';
                         console.log(err_str+err);
                         connection.end(); 
                         if( Callback ) Callback(''); 
                         return '';
                      }
                      //console.log('[[[[[[[[[[[[[[[处理结果中]]]]]]]]]]');
                      //console.log('typeof:' + typeof rows);
                      //console.log(rows.length);
                      //console.log(rows);
                      
                      if(rows.length ===0){
                         connection.end(); 
                         if( Callback ) Callback(''); 
                         return '';
                      }
                      connection.end(); 
                      if( Callback ) Callback(rows); 
                      return rows;
                });
    
          
    }
    
 
    
};

/* Viewtpl为模版生成显示模型 */
exports.Viewtpl =function (tplname, strarr ,response) {
    /*
       第一介参数：Tpl目录下的模版文件 (例：index/index.html)
       第二个参数：如不是数组就在模版里用#调用
       第三个参数：如果没有则返回字符串，否则显示输入出
    */
    if(!tplname || !strarr) return false;
    var filePath = path.join(__dirname, '../Tpl/' +tplname);
    //console.log('tplname:' + tplname + '\n' +filePath);
    //看看是不是文件(非异步)
    if(fs.existsSync(filePath)){
         content = fs.readFileSync(filePath, 'utf-8');
         //console.log('html:');
         
         //var html = ejs.compile(content, strarr);
         //var html = path.join(path.dirname(filePath), './head.htm');
         //console.log('______arr:'+strarr);
          
         var html = ejs.render(content, {
           datas: strarr,// 需要渲染的数据  
           filename: filePath //文件目录传入方便以后 include
         });  
         
         if(!response) return html;
         response.writeHead(200, {"Content-Type": "text/html"});
         response.write(html);
         response.end();
    }
};
