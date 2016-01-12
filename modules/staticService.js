/**
 * 引入模块
 * @type {[type]}
 */
var fs=require("fs");
var mime=require("mime");
var path=require("path");





/*******************************************************************************************/





/**
 * [Send 创建发送响应对象]
 */
function Send(){};
Send.prototype.cache={};//设置缓存变量，因为缓存变量比读取文件要快



/**
 * 错误404页面
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
Send.prototype.err404 = function(res){
    res.writeHead(404,{"Content-Type":"text/plain"});
    res.write("404 Not Fount !");
    res.end();
};



/**
 * 正确访问页面
 * @param  {[type]} res         [description]
 * @param  {[type]} fileName    [description]
 * @param  {[type]} fileContent [description]
 * @return {[type]}             [description]
 */
Send.prototype.sendFile = function(res,fileName,fileContent){
    res.writeHead(200,{"Content-Type":mime.lookup(path.basename(fileName))});
    res.end(fileContent);

};



/**
 * 发送静态页面方法
 * @param  {[type]} res     [description]
 * @param  {[type]} absPath [description]
 * @return {[type]}         [description]
 */
Send.prototype.serveStatic = function(res,absPath){
    var _this=this;
    if(this.cache[absPath]){
        this.sendFile(res,absPath,this.cache[absPath]);
    }else{
        fs.exists(absPath,function(exists){
            if(exists){
                fs.readFile(absPath,function(err,data){
                    if(err){
                        _this.err404(res);
                    }else{
                        _this.sendFile(res,absPath,data);
                    }
                })
            }else{
                _this.err404(res);
            }
        })

    }
};






/*******************************************************************************************/


module.exports=Send;



