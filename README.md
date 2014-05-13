# YSYS

YSYS����Ԫ��Node.js�������(MVC)
����ֿ��ַ[YSYS](http://github.com/feikeq/ysys)

## ����

YSYS��һ����ѿ�Դ�ģ����١��򵥵���������������Node.js������ܣ���Ϊ������WEBӦ�ÿ����ͼ���ҵӦ�ÿ����������ġ�
 

## Ŀ¼�ṹ

 * Ŀ¼/�ļ�	               ˵��
 * -----------------------------------------------------------
 * index.js	                  �������ļ�(��������)
 *   ������ Action	              �������ļ�Ŀ¼
 *   ������ Conf	                ��������ļ�Ŀ¼
 *   ������ Lib	                ��ܺ��Ļ����Ŀ¼
 *        ���������� Lib/index.js  ���HTTP����
 *          ������ Lib/router.js ���·��
 *          ������ Lib/common.js ���÷���ģ��
 *   ������ Tpl	                ģ��Ŀ¼
 *   ������ node_modules	        �����չĿ¼(����������µ�ģ��)
 


# URLģʽ

���Ӧ�ò��õ�һ����ļ���ִ�У������վ�����е�ģ��Ͳ�����ͨ��URL�Ĳ��������ʺ�ִ�С�
����һ������ͳ��ʽ���ļ���ڷ��ʻ�����URL�Ĳ�����ͳһ�����͵��ȡ�

index.js �� function index() ΪĬ�����

���� Action Ŀ¼���� abc.js 
�����ķ��ʵ�ַΪ http://localhost/abc/ �� http://localhost/abc/index
��Ϊ�����ַָ���Ĭ�Ϸ���Ϊindex����
����abc.js����exportsӳ�� gogogo ���� ��Ҫ�������������ַӦ����
http://localhost/abc/gogogo
�Դ�����

����
function index(response, request) {
      //index������
      // ��վ��� http://localhost/
      // ͬ���� http://localhost/index/index
      // �� http://localhost/index/
   
    console.log("�ѳɹ�����'index' �������� 'index' ���� ");
    console.log("���Conf/index.js�����ļ���");
    console.log(CONFIG); //���������Ϣ������̨
    
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('������������');
    response.end();
}
//ӳ����Щ������ģ�鲢��������
exports.index = index;

 
## ����ļ�index.js
   ���������������ϲ����������app.js
   // ��������Ԫ��YSYS���Ŀ¼
   var YSYS_PATH ='./ysys/';
   // ��������YSYS���
   require(YSYS_PATH+'Lib').run(8888); //����8888�˿ڵ�HTTP����д��Ϊ80�˿�
    
    
## ʹ�÷���

 �ڿ���̨���롰node index���������У�Ȼ����� http://x.x.x:8888
 Ҫ��̨���в��ұ������������� nohup node index 1>log.txt & 


## ģ��

    //�������Ҫ�Ĺ��÷���ģ��
    var Common = require('../Lib/common');
    Common.Viewtpl('index/index.html',{Ҫ����Ķ���},response); // ģ�������TplĿ¼��
    //��������д�ķ�����Ϣ
    var str = Common.Viewtpl('index/index.html',users); //����response������ȥ
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end(str);
    
    ����ģ��������߼������ο� node_modules\ejs\Readme.md ����

## ���ݿ�

  //�������Ҫ�Ĺ��÷���ģ��
  var Common = require('../Lib/common');
  Common.QuickDB($tabname,$data_arrstr,$where_str,$DESCGROUP,Callback);
  - `$tabname`           ��������ѡ��
  - `$data_arrstr`       �ֶζ�����ַ�����ѡ��
  - `$where_str`         ������䣨��ѡ��
  - `$DESCGROUP`         ���������LIMIT�� 
  - `Callback`           �ص�����
  

  // ��$data_arrstr(����) ��      $where_str ʱ�Ǹ������� UPDATE ��
  //  ��$data_arrstr(����) û��    $where_str ʱ�ǲ������� INSERT ��
  //û��$data_arrstr(�ַ�) �л�û  $where_str ʱ�ǲ�ѯ���� SELECT ��� count ͳ��
  
  
  ����
  //ӳ��test1����
exports.test1 =function(response, request) {
    console.log("\n\n\n\n�ѳɹ�����'database' �������� 'test1 ���� ");
    console.log("��ѯ���ݿ�");
     ret = Common.QuickDB('game_cfg','*',"`title`='��ˮ��'",'ORDER BY  `gid` DESC',function(data){
          console.log(data);//������������̨
          response.writeHead(200, {"Content-Type": "text/plain"});
          response.end('��Ϊû����Ĵ���ȥ����̨console�������'); 
     });
}


## �����ļ�
�ļ��ڿ��Ŀ¼�µ�Conf/index.js�ļ�����ö�˵ʲô�㿴�ö��ģ��ǡ�

global.CONFIG = {
  //������������ÿ��������
  'SITE_NAME':'YSYS����Ԫ��Node.js���������',
  'COOKIE_DOMIN' : '127.0.0.1', //cookie��
  'SITE_UPLOADS' : 'uploads/', //�ϴ��ļ���ַ
  //MySql���ݿ�����
  MYSQL : {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'test', //����
      dateStrings: false
  }
};
  
  
## ��д��ô��ɣ�д�ĵ�̫��
  YSYS_nojs v0.1
  @date 2014-05-13
  Copyright 2014, FeikeWorld - http://www.fk68.net
  @author feikeq
  Node.js����QQȺ��12834508  
  
  [��ʼ�](http://www.tibiji.com/?from=nodjs)
 
 
## ��������

ͨ�� Apache ������� Node��
-----------------------------------------------------------------
��Է��������Ѿ����� apache �� Node ͬʱ��������� 80 �˿ڸ� Node ʹ���������߼�� ��
ԭ�����ʹ�� Apache �������������Ҳ����ʹ Node �� Apache ��һ����������ͬʱ�ṩ���񣬲��Ҷ�ֻʹ�����������üӶ˿ں�:

��ô�����������ʵ�֣�

1.�� Apache ������conf/httpd.conf�ļ��У����� mod_proxy �� mod_proxy_http ������ģ�飺
#LoadModule proxy_module modules/mod_proxy.so
#LoadModule proxy_http_module modules/mod_proxy_http.so
Ҳ����ȥ��������ǰ��� # �ż��ɡ�(�����Щģ���Ѿ������˾Ͳ����ֶ�����)

2.��������������conf/vhosts.conf�ļ�����������Ĵ��룺
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

ע�⣺
    �˴� node.js �� www.node.js Ϊ�󶨵�Ҫ���� Node �����������
    ��һ�е�<VirtualHost *:80>�е�*���粻���þ����������IP��ַ��(���õ���IP��ַ)
    http://localhost:8888/ Ϊ�������Ϸ��� Node ����ַ�Ͷ˿ںţ������� 8888 Ϊ����

2.������� Node ����Ȼ������ Apache ���������������ʱ����Ϳ��Կ����� Node �ṩ�������վ�ˡ�

(��ע�����ʹ�õ��� Nignx �Ļ���Ҳ������ͬ����ԭ����ʵ�֣�������ֻ���� Apache ����û�г�����ȥ�� Nignx����Ȼ�ˣ�����������Ҳһ����)

