var fs = require('fs');
var pomelo = require('pomelo');

var mysqlMgr = require("./app/dao/mysql/mysqlMgr");
var mysqlCfg = require("./config/mysql");
var routeUtil = require("./app/util/routeUtil")
/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'server');

/////

app.configure('production|development','playerbjl|playerlh|hall|qutota', function(){

  require('./app/base/gameData/cfg/CConfigData');
  Game.Data.CFG.CConfigData.Instance.loadWatchJSON(app);

});
app.configure('production|development','rootgame', function(){

  require('./app/base/gameData/cfg/CConfigData');
  Game.Data.CFG.CConfigData.Instance.loadRootGameJSON(app);

});
////////
// app configuration
app.configure('production|development', 'connector|dealer', function(){
  app.set('connectorConfig',
      {
        connector : pomelo.connectors.hybridconnector,
        heartbeat : 3,
        useDict : true,
        useProtobuf : true,
        //ssl: {
        //  type: 'wss',
        //	key: fs.readFileSync('../shared/server.key'),
        //	cert: fs.readFileSync('../shared/server.crt')
        //}
      });
});
//app.configure('production|development', function(){
//  app.loadConfig("mysql",app.getBase()+"/config/mysql.json");
//});

app.configure('production|development', 'login|regist', function(){
  app.set("dbMgr",mysqlMgr);

  mysqlMgr.init(app,mysqlCfg.acc,"acc");
  var user = mysqlCfg.user;
  for(var i=0;i<user.length;i++)
  {
    mysqlMgr.init(app,user[i],"user_"+(i+1))
  }
  app.set("userDbCount",user.length);
});
app.configure('production|development', 'playerbjl|playerlh', function(){
  app.set("dbMgr",mysqlMgr);
  var user = mysqlCfg.user;
  for(var i=0;i<user.length;i++)
  {
    mysqlMgr.init(app,user[i],"user_"+(i+1))
  }
  app.set("userDbCount",user.length);
});


app.configure('production|development', 'db', function(){


  var user = mysqlCfg.user;
  var id = app.getServerId();
  id = parseInt(id[id.length-1]);
  mysqlMgr.init(app,user[id-1],"user_"+id)


  app.set("dbMgr",mysqlMgr.mysqlMap["user_"+id]);

});
app.configure('production|development', 'dealerdb', function(){
  app.set("dbMgr",mysqlMgr);
  mysqlMgr.init(app,mysqlCfg.acc,"acc");

});
app.configure('production|development', 'rootgame', function(){
  app.set("dbMgr",mysqlMgr);
  mysqlMgr.init(app,mysqlCfg.gameresault,"gameresault");

});
app.configure('production|development', 'login', function(){
  require('./app/httpServer/login/login');
  Game.HttpServer.Login.Create(app);
});
app.configure('production|development', 'regist', function(){
  require('./app/httpServer/regist/regist');
  Game.HttpServer.Regist.Create(app);
});

app.configure('production|development', 'gm', function(){
  require('./app/httpServer/gm/gm');
  Game.HttpServer.GM.Create(app);

  app.set("dbMgr",mysqlMgr);

  mysqlMgr.init(app,mysqlCfg.gm_moneyDao,"gm_money");
  mysqlMgr.init(app,mysqlCfg.acc,"acc");
});



app.configure('production|development', function(){
  app.route('connector', routeUtil.connector);
  app.route('db', routeUtil.database);
  app.route('hall', routeUtil.createRoot("hall"));
  app.route('playerbjl', routeUtil.createPlayer("playerbjl"));
  app.route('playerlh', routeUtil.createPlayer("playerlh"));
  //app.route('rootbjl', routeUtil.createRoot("rootbjl"));
  //app.route('rootlh', routeUtil.createRoot("rootlh"));
  app.route('rootgame', routeUtil.createRoot("rootgame"));
  app.route('dealerdb', routeUtil.createRoot("dealerdb"));
  app.route('qutota', routeUtil.createPlayer("qutota"));

});
app.configure('production|development','crossdomain', function(){

  var crossdomainHelper = require("./app/util/crossdomainHelper");
  crossdomainHelper.start(app);

});

//app.configure('production|development', 'db', function(){
//
//  var dbNames=["user"];
//  for(var i=0;i<dbNames.length;i++)
//  {
//    var name = dbNames[i];
//    var dbMgr = mysqlMgr.init(app,name,1);
//    app.set("dbMgr_"+name,dbMgr);
//  }
//
//});
// start app
app.start();

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});