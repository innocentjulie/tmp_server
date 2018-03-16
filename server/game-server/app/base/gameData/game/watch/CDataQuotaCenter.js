///**
// * Created by z on 2018/1/19.
// */
///**
// * Created by z on 2018/1/5.
// */
//require('../base/CBaseDataCenter');
//require('./CDataQutota');
//var enums = require("../../../../consts/enums");
//var consts = require("../../../../consts/consts");
//Class({
//    ClassName:"Game.Data.Center.CDataQuotaCenter",
//    Base:"Game.Data.CBaseDataCenter",
//
//    QuotaClass:null,
//    ctor:function()
//    {
//        Game.Data.CBaseDataCenter.prototype.ctor.apply(this,arguments);
//        this.m_Quota = {};
//
//    },
//    initQuota:function(keys)
//    {
//        var cfg = Game.Data.CFG.CConfigData.Instance.CFG;
//        var glist = null,gid;
//        for(var i=0;i< keys.length;i++)
//        {
//            glist = cfg["limit_{0}".Format(keys[i])];
//            gid = enums.Games[keys[i]];
//            var tempQuo = this.m_Quota[gid] = {};
//            for(var id in glist)
//            {
//                tempQuo[id] = new Game.Data.Room.Qutota(glist[id]);
//            }
//
//        }
//    },
//    joinRoom:function(uid,gameType,quid,pid,person)
//    {
//        var quota = this.m_Quota[gameType][quid];
//        if(quota)
//        {
//            quota.join(uid,pid,person);
//        }
//    },
//
//    leaveRoom:function(uid,gameType,quid,pid)
//    {
//        var quota = this.m_Quota[gameType];
//        if(quota && (quota=quota[quid]))
//        {
//            quota.leave(uid,pid);
//        }
//    },
//    toJSONByGame:function(gid)
//    {
//        return this.m_Quota[gid];
//    },
//    toJSON:function()
//    {
//        return this.m_Quota;
//    },
//    AddARoom:function(room)
//    {
//
//
//    },
//    RemoveARoom:function(room)
//    {
//
//    }
//
//})