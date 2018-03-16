/**
 * Created by root on 1/4/17.
 */



require("../../base/gameData/user/CUserData");
 require("./../base/CBaseHttp");
var consts = require('../../consts/consts');
var Token = require('../../util/token');
var secret = require('../../../config/session').secret;
var encode = require('../../util/encode');
var acc_userDao = require('../../dao/acc_userDao');
var accountDao = require('../../dao/accountDao');
Class({
    ClassName:"Game.HttpServer.Login",
    Base:"Game.HttpServer.BaseHttp",
    checkFuncs:{
        "/token":"testToken"
    },
    testToken:function(reqInfo,resback)
    {
        var ses = reqInfo.ses;
        var type = reqInfo.type;
        if(type == 0)
        {
            if(ses == null)
            {
                resback({code: consts.LOGIN.REGIEST_FAIL});
                return;
            }
            var ay = ses.split("|");
            if(ay.length == 2)
            {
                var acc = ay[0],pwd = encode.md5(ay[1]);
                var connectors = this.m_App.getServersByType("connector");

                accountDao.getDataByAcc(acc,function(err,accData)
                {

                    if(!err && accData &&  (accData=accData[0]) &&accData.password === pwd)
                    {
                        acc_userDao.getDataByUid(accData.userid,function(err,userData)
                        {
                            if(!err &&userData && userData.length == 1  )
                            {
                                resback({token:Token.create(accData.userid,secret),host:connectors[0].clientHost,port:connectors[0].clientPort,u:1});
                            }
                            else
                            {
                                resback({token:Token.create(acc,secret),u:0});
                            }
                        });
                    }
                    else
                    {
                        resback({code: consts.LOGIN.LOGIN_FAIL});
                    }
                })
                return;
            }
        }
        resback({code: consts.LOGIN.REGIEST_FAIL});
    }
}).Static({
    Create:function(app)
    {
        var self = new this;
        setTimeout(function()
        {
            var id = app.getServerId();
            var sInfo = app.getServerById(id);
            self.init(app,sInfo.httpPort);
        },1000*5)
    }
})
