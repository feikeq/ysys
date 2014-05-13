//添加所需要的额外模块
var url = require("url"); 
var path = require('path');
var fs = require('fs');

//定义文件类型
var CONTENT_TYPE = {
  "aiff": "audio/x-aiff",
  "arj": "application/x-arj-compressed",
  "asf": "video/x-ms-asf",
  "asx": "video/x-ms-asx",
  "au": "audio/ulaw",
  "avi": "video/x-msvideo",
  "bcpio": "application/x-bcpio",
  "ccad": "application/clariscad",
  "cod": "application/vnd.rim.cod",
  "com": "application/x-msdos-program",
  "cpio": "application/x-cpio",
  "cpt": "application/mac-compactpro",
  "csh": "application/x-csh",
  "css": "text/css",
  "deb": "application/x-debian-package",
  "dl": "video/dl",
  "doc": "application/msword",
  "drw": "application/drafting",
  "dvi": "application/x-dvi",
  "dwg": "application/acad",
  "dxf": "application/dxf",
  "dxr": "application/x-director",
  "etx": "text/x-setext",
  "ez": "application/andrew-inset",
  "fli": "video/x-fli",
  "flv": "video/x-flv",
  "gif": "image/gif",
  "gl": "video/gl",
  "gtar": "application/x-gtar",
  "gz": "application/x-gzip",
  "hdf": "application/x-hdf",
  "hqx": "application/mac-binhex40",
  "html": "text/html",
  "ice": "x-conference/x-cooltalk",
  "ief": "image/ief",
  "igs": "model/iges",
  "ips": "application/x-ipscript",
  "ipx": "application/x-ipix",
  "jad": "text/vnd.sun.j2me.app-descriptor",
  "jar": "application/java-archive",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "text/javascript",
  "json": "application/json",
  "latex": "application/x-latex",
  "lsp": "application/x-lisp",
  "lzh": "application/octet-stream",
  "m": "text/plain",
  "m3u": "audio/x-mpegurl",
  "man": "application/x-troff-man",
  "me": "application/x-troff-me",
  "midi": "audio/midi",
  "mif": "application/x-mif",
  "mime": "www/mime",
  "movie": "video/x-sgi-movie",
  "mp4": "video/mp4",
  "mpg": "video/mpeg",
  "mpga": "audio/mpeg",
  "ms": "application/x-troff-ms",
  "nc": "application/x-netcdf",
  "oda": "application/oda",
  "ogm": "application/ogg",
  "pbm": "image/x-portable-bitmap",
  "pdf": "application/pdf",
  "pgm": "image/x-portable-graymap",
  "pgn": "application/x-chess-pgn",
  "pgp": "application/pgp",
  "pm": "application/x-perl",
  "png": "image/png",
  "pnm": "image/x-portable-anymap",
  "ppm": "image/x-portable-pixmap",
  "ppz": "application/vnd.ms-powerpoint",
  "pre": "application/x-freelance",
  "prt": "application/pro_eng",
  "ps": "application/postscript",
  "qt": "video/quicktime",
  "ra": "audio/x-realaudio",
  "rar": "application/x-rar-compressed",
  "ras": "image/x-cmu-raster",
  "rgb": "image/x-rgb",
  "rm": "audio/x-pn-realaudio",
  "rpm": "audio/x-pn-realaudio-plugin",
  "rtf": "text/rtf",
  "rtx": "text/richtext",
  "scm": "application/x-lotusscreencam",
  "set": "application/set",
  "sgml": "text/sgml",
  "sh": "application/x-sh",
  "shar": "application/x-shar",
  "silo": "model/mesh",
  "sit": "application/x-stuffit",
  "skt": "application/x-koan",
  "smil": "application/smil",
  "snd": "audio/basic",
  "sol": "application/solids",
  "spl": "application/x-futuresplash",
  "src": "application/x-wais-source",
  "stl": "application/SLA",
  "stp": "application/STEP",
  "sv4cpio": "application/x-sv4cpio",
  "sv4crc": "application/x-sv4crc",
  "svg": "image/svg+xml",
  "swf": "application/x-shockwave-flash",
  "tar": "application/x-tar",
  "tcl": "application/x-tcl",
  "tex": "application/x-tex",
  "texinfo": "application/x-texinfo",
  "tgz": "application/x-tar-gz",
  "tiff": "image/tiff",
  "tr": "application/x-troff",
  "tsi": "audio/TSP-audio",
  "tsp": "application/dsptype",
  "tsv": "text/tab-separated-values",
  "txt": "text/plain",
  "unv": "application/i-deas",
  "ustar": "application/x-ustar",
  "vcd": "application/x-cdlink",
  "vda": "application/vda",
  "vivo": "video/vnd.vivo",
  "vrm": "x-world/x-vrml",
  "wav": "audio/x-wav",
  "wax": "audio/x-ms-wax",
  "wma": "audio/x-ms-wma",
  "wmv": "video/x-ms-wmv",
  "wmx": "video/x-ms-wmx",
  "wrl": "model/vrml",
  "wvx": "video/x-ms-wvx",
  "xbm": "image/x-xbitmap",
  "xlw": "application/vnd.ms-excel",
  "xml": "text/xml",
  "xpm": "image/x-xpixmap",
  "xwd": "image/x-xwindowdump",
  "xyz": "chemical/x-pdb",
  "zip": "application/zip"
};

function router_fun(response, request) {
  //router_fun路由主方法
  var pathname = url.parse(request.url).pathname; //获得路径(去掉参数)
  //console.log("About to route a request for: " + pathname);
  
  
  //通过route来获取controller和action信息
  var actionInfo = getActionInfo(pathname);
  
  //如果这个路径是方法名就执行这个方法
  if(actionInfo){
     console.log('-----开始执行路由转化过来的方法-------');
     actionInfo(response, request); 
  } else {
    //如果路径不是控制方法
    var tmp_ = path.dirname(__dirname), temp=[];
    tmp_=tmp_.split(path.sep);
    var YSYSpath = tmp_[tmp_.length -1]//系统目录
    
    tmp_ = pathname.split("/");
    for (var k in tmp_){
           if (tmp_[k]) temp.push(tmp_[k]);
    }
    //console.log('YSYSpath:'+YSYSpath);
    
    //为了安全禁止访问YSYS框架目录
    if(temp[0] ==YSYSpath){
         response.writeHead(500, { "Content-Type": "text/plain" });
         response.end("No Access:YSYS engine dir!");
         return;
    }
    pathname =path.join(__dirname, '../../'+pathname);
    
    //看看是不是文件
    fs.exists(pathname, function (exists) {
          //如果文件存在
          if (exists) {
               var stat = fs.statSync(pathname); // 文件信息（非异步）
               //console.log(stat.isFile());
               //如果是文件
               if(stat.isFile()){
                   //以字节读取文件内容
                   fs.readFile(pathname, 'binary', function (err, file) {
                      if (!err) {   
                              var ext;
                              ext = (ext = path.extname(pathname)) ? ext.slice(1) : 'html'; //获得文件后缀名
                              console.log("输入文件类型为:" + ext);
                              response.writeHead(200, { 'Content-Type': CONTENT_TYPE[ext] || CONTENT_TYPE.html });
                              response.write(file, 'binary'); //输出文件内容
                              response.end();
                      }else{
                              response.writeHead(500, { "Content-Type": "text/plain" });
                              response.end("Server Error:" + err);
                      }
                      
                  });
              
               }else{
                  console.log("这只是个目录 " + pathname);
                  response.writeHead(404, {"Content-Type": "text/html"});
                  response.write("404 Not found");
                  response.end();
               }
                      
              
          }else{
              console.log("服务器没有找到这个文件 " + pathname);
              response.writeHead(404, {"Content-Type": "text/html"});
              response.write("404 Not found");
              response.end();
          }
              
          
    });
  }
}

function getActionInfo(url){
    //getActionInfo获得控制器
    if(!url) return;
    if(url=='/'){
        controller = 'index';
        action = 'index';
    }else{
        var arrstr = url.split("/");
        var controller,action,temp=[];
        for (var k in arrstr){
           if (arrstr[k]) temp.push(arrstr[k]);
        }
        //console.log(temp);
        if(temp.length>1){
           controller = temp[0];
           action = temp[1];
        }else{
           controller = temp[0];
           action = 'index';
        }
    }
    
    //var cpath ='./'+ysys+'/Action/' +controller+'.js'; //控制器文件所在目录
    var cpath =path.join(__dirname, '../Action/' +controller+'.js');
    var nodejs ='../Action/' +controller; //控制器目录
    
        //console.log( 'path : ' + cpath);
        //console.log(controller +' : '+ action);
        //看看是不是文件(非异步)
        if(fs.existsSync(cpath)){
            var controller_new = require(nodejs); // ./controllers/blog
            if(controller_new[action]){
                 console.log('控制器：'+controller+'.js \n方法：' +action);
                 //console.log(controller_new[action]);
                 //temp =['controller':controller,'action':nodejs];
                 //return temp;
                 return controller_new[action];
            }
            //temp =['controller':controller];
            return;
        } 
}
exports.router = router_fun;//映射router_fun这个方法到模块并命名为router