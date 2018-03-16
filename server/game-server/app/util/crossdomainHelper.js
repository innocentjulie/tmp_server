/**
 * Created by z on 2018/2/1.
 */
var net = require('net');
var fs = require('fs');

var helper = {

    start:function(app)
    {
        var rootPath = app.getBase();

        var crossDomainFile = fs.readFileSync(rootPath+"/config/data/crossdomain.xml",'utf-8');
        crossDomainFile+="\0";

         // 创建一个TCP服务器实例，调用listen函数开始监听指定端口
        // 传入net.createServer()的回调函数将作为”connection“事件的处理函数
        // 在每一个“connection”事件中，该回调函数接收到的socket对象是唯一的
        net.createServer(function(sock) {

            // 我们获得一个连接 - 该连接自动关联一个socket对象
            //console.warn('CONNECTED: ' +
            //    sock.remoteAddress + ':' + sock.remotePort);

            // 为这个socket实例添加一个"data"事件处理函数
            sock.on('data', function(data) {
                //

                // 回发该数据，客户端将收到来自服务端的数据

                // [<policy-file-request/>
                if(data.indexOf("policy-file-request")>0)
                {
                    //console.warn(crossDomainFile);
                    sock.write(crossDomainFile);
                }
                else
                {
                    console.warn('DATA 2:['  + data+"]");
                    sock.write('');
                }



            });

            // 为这个socket实例添加一个"close"事件处理函数
            //sock.on('close', function(data) {
            //    console.warn('CLOSED: ' +
            //        sock.remoteAddress + ' ' + sock.remotePort);
            //});

        }).listen(843,function()
        {

        });



    }
}

module.exports = helper;