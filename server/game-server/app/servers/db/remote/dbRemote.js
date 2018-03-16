/**
 * Created by root on 3/8/17.
 */

var consts = require('../../../consts/consts');
require('../../../core/Core');
require('../../../base/servers/CBaseRemote');
require('../gameData/CDBDataCenter');


Class({
    ClassName:"CPomelo.Remote.CDBRemote",
    Base:"CPomelo.Remote.CBaseRemote",
    DataCenter:null,
    onInit:function()
    {

        console.warn("game remote init:"+ this.m_App.getServerId());
        this.DataCenter = new Game.Data.CDBDataCenter();
    },
    GetUser:function(uid, cb)
    {
        this.DataCenter.SafeGetPerson(uid,function(person)
        {
            if(person)
            {
                cb(null,person);
                return;
            }
            cb(-1,{code:consts.LOGIN.DB_GETINFO_ERROR})
        })
    },
    onUserLeave:function(uid, next)
    {
        next();
        this.DataCenter.removeUser(uid);
    },
    costMoney:function(uid,money,force,cb)
    {
        var person = this.DataCenter.Persons[uid];
        if(!person)
        {
            cb(null,{code:consts.LOGIN.DB_GETINFO_ERROR})
            return;
        }
        var ret = person.costMoney(money,force);
        if(ret)
        {
            cb(null,{money:person.UserData.livemoney})
        }else
        {
            cb(null,{code:consts.MONEY.LIVE_MONEY_LESS})
        }

    },
    gmCostMoney:function(uid,money,cb)
    {
        var person = this.DataCenter.Persons[uid];
        if(!person)
        {
            cb(null,{code:consts.NOR_CODE.ERR_NO_USER})
            return;
        }
        var c = person.UserData.livemoney;
        var ret = person.costMoney(money,true);
        if(ret)
        {
            cb(null,{c:c,money:person.UserData.livemoney})
        }else
        {
            cb(null,{code:consts.MONEY.LIVE_MONEY_LESS})
        }
    },
    betResChangeMoney:function(users,next)
    {
        next();

        for(var uid in users)
        {
            var person = this.DataCenter.Persons[uid];
            person.costMoney(users[uid],false);
        }
    }
})

module.exports = function(app) {
    return new CPomelo.Remote.CDBRemote(app);
};