/**
 * 引入HTTP组建，创建HTTP服务器的核心组件
 * @type {[type]}
 */
var http=require("http");
var sio=require("socket.io");

/**
 * 引入自定义组件，
 * @type {[type]}
 */
var staticService=require("./modules/staticService");


/**
 * 处理聊天室业务逻辑
 */
var chatServer=require("./lib/chat_server");
chatServer.listen(server);



/*************************************************/


/**
 * 创建http服务
 * @param  {[type]} req    [description]
 * @param  {[type]} res){                 var filePath [description]
 * @return {[type]}        [description]
 */
var server = http.createServer(function(req,res){
    var filePath=false;
    if(req.url=="/"){
        filePath="public/index.html";
    }else{
        filePath="public"+req.url;
    }
    var absPath="./"+filePath;
    var send=new staticService();
    send.serveStatic(res,absPath);
});

server.listen(8200,function(){
    console.log("Http server create success on : localhost:8200");
})

io=sio.listen(server);

io.on("connection",function(socket){
    socket.emit("hello","你好")
})

