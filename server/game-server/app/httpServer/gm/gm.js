/**
 * Created by z on 2018/1/19.
 */
/**
 * Created by root on 1/4/17.
 */



require("../../base/gameData/user/CUserData");
require("./../base/CBaseHttp");
var consts = require('../../consts/consts');
var Token = require('../../util/token');
var secret = require('../../../config/session').secret + "_j#dC3";
var encode = require('../../util/encode');
var gmDao = require('../../dao/gmDao');
var gm_moneyDao = require('../../dao/gm_moneyDao');

Class({
    ClassName:"Game.HttpServer.GM",
    Base:"Game.HttpServer.BaseHttp",
    checkFuncs:{
        "/cMoney":"ChangeMoney",
        "/gtoken":"testg_mToken",
        "/umy":"gUserMoney"
    },
    checkTimeOut:function(token)
    {

        var info = Token.parse(token,secret);
        var ntime = parseInt(Date.now()/1000)
        if(!info ) {

            return null;
        }
        return info;
    },
    testg_mToken:function(reqInfo,resback)
    {
        var ses = reqInfo.ses;
        var type = reqInfo.type;
        if(type == 3)
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
                gmDao.getDataByAcc(acc,function(err,gData)
                {
                    if(!err && gData && gData.length == 1 &&(gData=gData[0]) && gData.password == pwd)
                    {
                        resback({token:Token.create(acc,secret)});
                        return;
                    }
                    resback({code: consts.LOGIN.REGIEST_FAIL});
                })
                return;
            }
        }
        resback({code: consts.LOGIN.REGIEST_FAIL});
    },
    gUserMoney:function(reqInfo,resback)
    {
        var rtoken = reqInfo.token,userid = reqInfo.userid;
        var info = this.checkTimeOut(rtoken);
        if(!info || !userid) {
            resback({code: consts.LOGIN.TOKEN_OUT_TIME});
            return;
        }
        userid += "";
        var self = this;
        this.m_App.rpc.db.dbRemote.GetUser({uid:userid},userid,function(err,data)
        {
            resback(data);
        })

    },
    ChangeMoney:function(reqInfo,resback)
    {
        var rtoken = reqInfo.token,userid = reqInfo.userid,money = parseInt(reqInfo.m);

        var info = this.checkTimeOut(rtoken);
        if(isNaN(money) || !userid ||  !info) {

            resback({code: consts.LOGIN.TOKEN_OUT_TIME});
            return;
        }
        userid += "";
        var gmAcc = info.userid;
        if(!gmAcc)
        {
            console.warn(gmAcc);
        }
        var self = this;
        this.m_App.rpc.db.dbRemote.gmCostMoney({uid:userid},userid,money,function(err,data)
        {
            /// gm_acc`,`money`,`userid`,`current`,`resault`,`time
            if(data && !data.code)
            {
                gm_moneyDao.CreateData(gmAcc,money,userid,data.c,data.money,parseInt(Date.now()/1000));
            }

            resback(data);
        })


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
