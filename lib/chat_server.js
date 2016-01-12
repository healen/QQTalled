var socketio=require("socket.io");
var io;
var guestNumber=1;//在线嘉宾
var nickNames={};//昵称
var namesUsed=[];//正在使用
var currentRoom[];//当前聊天室

exports.listen=function(server){
    io=socketio.listen(server);
    io.set("log level",1);
    io.sockets.on("connection",function(socket){
        guestNumber=assignGuestName(socket,guestNumber,nickNames,namesUsed);
        joinRoom(socket,'lobby');
        handleMessageBroadcasting(socket,nickNames);
        handleNameChangeAttempts(socket,nickNames,namesUsed);
        handleRoomJoining(socket);

        socket.on('roos',function(){
            socket.emit('room',io.scokets.manager.rooms);
        });
        handleClientDisconnection(socket,nickNames,namesUsed);


    })
}

