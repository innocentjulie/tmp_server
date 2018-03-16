/**
 * Created by root on 1/4/17.
 */

require("../../core/Core");
require("./CACCCFGata");
require("./../base/CBaseHttp");
var consts = require('../../consts/consts');
var Token = require('../../util/token');
var secret = require('../../../config/session').secret;
var encode = require('../../util/encode');
var accountDao = require('../../dao/accountDao');
var acc_userDao = require('../../dao/acc_userDao');
var acc_moneyDao = require('../../dao/acc_moneyDao');

Class({
    ClassName:"Game.HttpServer.Regist",
    Base:"Game.HttpServer.BaseHttp",
    checkFuncs:{
        "/regist":"register",
        "/nUser":"createUser"
    },
    onInit:function()
    {
        this.m_CFG = new Game.Data.CACCCFGata();


    },
    createUser:function(reqInfo,resback)
    {

        // token is acc
        var rtoken = reqInfo.token,nickName = reqInfo.name,sex=parseInt(reqInfo.sex) || 0;
        var info = Token.parse(rtoken,secret);
        if(info)
        {
            var acc = info.userid;
            var nowTime = parseInt(Date.now()/1000);
            if(nowTime-info.timestamp > 5*60*60)
            {
                resback({code: consts.LOGIN.TOKEN_OUT_TIME});
                return;
            }
            nickName = nickName || acc;
            var connectors = this.m_App.getServersByType("connector");

            accountDao.getDataByAcc(acc,function(err,accData)
            {
                if(!err && accData && accData.length== 1 )
                {
                    accData = accData[0];
                    acc_userDao.CreateData(accData.userid,acc,nickName,sex,function(err,userData)
                    {
                        if(!err)
                        {
                            acc_moneyDao.CreateData(accData.userid,99999);
                            resback({token:Token.create(accData.userid,secret),host:connectors[0].clientHost,port:connectors[0].clientPort});
                        }
                        else
                        {
                            resback({code: consts.LOGIN.CREATE_USER_ERROR});
                        }
                    });
                }
                else
                {
                    resback({code: consts.LOGIN.ERR_UNKNOWN});
                }
            })

            return;
        }
        resback({code: consts.LOGIN.CREATE_USER_ERROR});
    },
    register:function(reqInfo,resback)
    {
       var acc=reqInfo.acc+"",pwd=reqInfo.pwd+"";
        if(acc.length>5 && acc.length<11 && pwd.length>5 && pwd.length<11)
        {
            var self = this;

            accountDao.CreateData(acc,encode.md5(pwd),function(err,accData)
            {
                if(!err  )
                {
                    var userDBIdx = parseInt(Math.random()*self.mUserDbCount)+1;
                    console.warn("register is:"+userDBIdx +  self.mUserDbCount);
                    var userid = "{0}_{1}".Format(userDBIdx, self.m_CFG.NextUid);
                    accountDao.updateUid(acc,userid );
                    /// acc token
                    resback({token: Token.create(acc,secret)});
                }
                else
                {
                    resback({code: consts.LOGIN.LOGIN_TOKEN_ERR});
                }
            })
        }
        else
        {
            resback({code: consts.LOGIN.REGIEST_FAIL});
        }

    },

}).Static({
    Create:function(app)
    {
        var self = new this;
        setTimeout(function()
        {
            var id = app.getServerId();
            var sInfo = app.getServerById(id);
            self.init(app,sInfo.httpPort);
            self.mUserDbCount = app.get("userDbCount");
            console.warn("userDbCount:"+self.mUserDbCount)
        },3000)



    }
})
