var consts = require('../../../consts/consts');
var enums = require('../../../consts/enums');
var Token = require('../../../util/token');
var secret = require('../../../../config/session').secret;
require('../../../base/servers/CBaseHandler');


Class({
	ClassName:"CPomelo.Handler.CEntryHandler",
	Base:"CPomelo.Handler.CBaseHandler",
	login:function(msg, session, next)
	{
		var acc = msg.acc;
		var pwd = msg.pwd;
		var type = msg.type;
		var self = this;
		self.app.rpc.dealerdb.dbRemote.GetUser({uid:"123"},acc,pwd,type,function(err,data)
		{
			if(err || !data)
			{
				next(null, {code: consts.LOGIN.LOGIN_TOKEN_ERR});
				return;
			}
			var token = Token.create(acc,secret)

			self.UserAdd(acc,token,session,function(){
				next(null, {token:token});
			})


		});
		return;
	},
	UserAdd : function(uid,token,session,cb)
	{
		var sessionService = this.app.get('sessionService');

		//duplicate log in
		var oldsession = sessionService.getByUid(uid);
		var sid = this.app.getServerId();
		var app = this.app;
		if (!! oldsession){
			var self = this;
			sessionService.kick(uid, function (err, result)
			{
				for (var i = 0;i < oldsession.length;++i) {


					oldsession[i].unbind(uid);
					oldsession[i].closed(0);
				}



				session.bind(uid);
				session.set('token',token);
				session.pushAll(function(err,data){});
				session.on('closed', self.onUserLeave.bind(null, app));
				cb();
			});
		}
		session.bind(uid);
		session.set('token',token);
		session.pushAll(function(err,data){});
		session.on('closed', this.onUserLeave.bind(null, this.app));


		cb();
	},
	onUserLeave:function(app,session)
	{
		if(!session || !session.uid) {
			return;
		}

		var uid = session.uid;
		app.rpc.dealerdb.dbRemote.onUserLeave({uid:uid}, uid, function(err, res){

		});

		app.rpc.rootgame.gameRemote.onUserLeave({uid:uid}, uid, function(err, res){

		});
	}
})

module.exports = function(app) {
	return new CPomelo.Handler.CEntryHandler(app);
};

