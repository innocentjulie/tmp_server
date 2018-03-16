/**
 * Created by z on 2018/1/17.
 */

require('../../../base/gameData/game/base/CBaseGameRoom');
require('./CQutoData');
var enums = require("../../../consts/enums");
var consts = require("../../../consts/consts");
Class({
    ClassName:"Game.Data.Game.CQutoRoom",
    Base:"Game.Data.Room.CBase",
    ctor:function()
    {
        Game.Data.Room.CBase.prototype.ctor.apply(this,arguments);
        this.mWatchers = [];
        this.initQuota();
        this.over(0);
    },
    mChange:{
        set:function(v)
        {
            if(!this.__mChange)
            {
                this.__mChange = v;
                setTimeout(this.delayToUpdateInfo,500,this);
            }
        }
    },
    delayToUpdateInfo:function()
    {
        this.__mChange = false;
        var info = {},tmpChange;
        var push = false;
        for(var qid in this.m_Quota)
        {

            tmpChange = this.m_Quota[qid].takeChange();
            if(tmpChange)
            {
                info[qid] = tmpChange;
                push = true;
            }
        }
        if(push)
        {
            this.DataCenter.pushGameInfo(this.mWatchers,this.deskId,"updateToWatchServerQutoChange",info);
        }
    },

    initQuota:function()
    {
        var cfg = Game.Data.CFG.CConfigData.Instance.CFG;
        var gid = this.gameId;

        var glist = cfg["limit_{0}".Format(enums.Games[gid])];

        var tempQuo = this.m_Quota = {};
        for(var id in glist)
        {
            tempQuo[id] = new Game.Data.Quto.CQuto(glist[id],this);
        }
    },
    AddWatchers:function(sType,sid)
    {
        this.mWatchers.push([sType,sid]);
    },

    RemoveWatch:function()
    {

    },
    changeXue:function()
    {

    },
    clearRoom:function()
    {
        this.resetBetCfg();
    },
    over:function()
    {
        this.resetBetCfg();
    },
    ForceRemovePerson:function(qInfo)
    {

        for(var id in qInfo)
        {
            this.m_Quota[id].ForceRemovePerson(qInfo[id]);
        }
        this.mChange = true;
    },
    resetBetCfg:function()
    {
        for(var key in this.m_Quota)
        {
            this.m_Quota[key].clearBet();
        }
    },
    updateInfo:function()
    {

    },
    toJSON:function()
    {
        return this.m_Quota;
    },
    updateToPlayerServerGameInfo:function()
    {
        if(this.mBetChange)
        {
            var pushInfo = {p:{},n:0};
            var posInfo = pushInfo.p;
            var tempSInfo = null;
            for(var sid in this.SeverBets)
            {
                tempSInfo = this.SeverBets[sid];
                pushInfo.n += tempSInfo.n;
                for(var pos in tempSInfo)
                {
                    if(posInfo.hasOwnProperty(pos))
                    {

                        posInfo[pos] = tempSInfo[pos];
                    }
                    else{
                        posInfo[pos] += tempSInfo[pos];
                    }
                }
            }

            this.DataCenter.pushGameInfo(this.mWatchers,this.deskId,"updateToWatchServerQutoInfo",pushInfo);
        }
        this.mBetChange = false;
    }


})
