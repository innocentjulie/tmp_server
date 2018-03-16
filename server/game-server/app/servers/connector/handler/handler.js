var consts = require('../../../consts/consts');
var enums = require('../../../consts/enums');
var Token = require('../../../util/token');
var secret = require('../../../../config/session').secret;
require('../../../base/servers/CBaseHandler');


Class({
	ClassName:"CPomelo.Handler.CEntryHandler",
	Base:"CPomelo.Handler.CBaseHandler",
	entry:function(msg, session, next)
	{
		var tokenInfo = Token.parse(msg.token,secret);
		if(tokenInfo)
		{
			console.warn("token uid is:"+tokenInfo.userid);

			var timestamp = Date.parse(new Date()) / 1000;
			if(timestamp - tokenInfo.timestamp > enums.TOKEN.TIMEOUT){
				next(null, {code: consts.LOGIN.TOKEN_OUT_TIME});
				return;
			}

			var uid = tokenInfo.userid;
			var self = this;
			self.app.rpc.db.dbRemote.GetUser({uid:uid},uid,function(err,data)
			{
				if(err)
				{
					console.warn("db get userid false");
					next(null, {code: consts.LOGIN.LOGIN_TOKEN_ERR});
					return;
				}

				//if(!
				//{
				//	console.warn("add session  false");
				//	next(null,{code: consts.LOGIN.LOGIN_TOKEN_ERR});
				//	return ;
				//}

				self.UserAdd(uid,msg.token,session,function(){
					data.userid = uid;
					next(null, data);
				});

			});
			return;
		}
		console.warn("session parse error");
		next(null, {code: consts.LOGIN.LOGIN_TOKEN_ERR});
	},
	UserAdd : function(uid,token,session,cb)
	{
		var sessionService = this.app.get('sessionService');

		//duplicate log in
		var oldsession = sessionService.getByUid(uid);
		var sid = this.app.getServerId();
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


		console.warn("leave uid is:"+uid);
		var sid = app.getServerId();
		app.rpc.db.dbRemote.onUserLeave({uid:uid}, uid, function(err, res){

		});
		app.rpc.hall.gameRemote.leave({uid:uid},null, uid,sid, function(err, res){

		});
		app.rpc.playerbjl.gameRemote.leave({uid:uid},null, uid,sid, function(err, res){

		});
		app.rpc.playerlh.gameRemote.leave({uid:uid},null, uid,sid, function(err, res){

		});
	}
})

module.exports = function(app) {
	return new CPomelo.Handler.CEntryHandler(app);
};

