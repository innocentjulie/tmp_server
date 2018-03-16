/**
 * Created by z on 2017/12/26.
 */

require('../../../base/servers/game/CBaseGameRemote');

var consts = require("../../../consts/consts")
require("../gameData/CDataCenter")
Class({
    ClassName:"CPomelo.Remote.CRootGameRemote",
    Base:"CPomelo.Remote.CBaseGameRemote",
    DataCenterName:"CRGDataCenter",
    // "start","end","settle","clear","reset","setGameId"

    updateInfoFromGameServer:function(sid,gameid,deskId,betInfo,next)
    {
        next();
        var room = this.DataCenter.mGames[gameid][deskId];
        room.updateInfoFromGameServer(sid,betInfo);
    },
    startBet:function(msg, uid,frontendId, next)
    {
        var room = this.DataCenter.mMasters[uid];
        var ok = false;
        if(room)
        {
            ok = room.startBet(msg.t)
        }
        var ret = {};
        if(!ok)
        {
            ret["code"] =  consts.NOR_CODE.ERR_FAIL;
            ret["status"] = room? room.status:0;
        }
        next(null,ret);
    },
    endBet:function(msg, uid,frontendId, next)
    {
        var room = this.DataCenter.mMasters[uid];
        var ok = false;
        if(room)
        {
            ok = room.endBet()
        }
        var ret = {};
        if(!ok)
        {
            ret["code"] =  consts.NOR_CODE.ERR_FAIL;
            ret["status"] =  room.status;
        }
        next(null,ret);
    },
    newCard:function(msg, uid,frontendId, next)
    {
        var room = this.DataCenter.mMasters[uid];
        var ok = false;
        if(room)
        {
            ok = room.ShowOneCard(msg.p,msg.idx,msg.v,msg.n,msg.np);
        }
        var ret = {};
        if(!ok)
        {
            ret["code"] =  consts.NOR_CODE.ERR_FAIL;
            ret["status"] =  room.status;
        }
        next(null,ret);
    },
    settle:function(msg, uid,frontendId, next)
    {
        var room = this.DataCenter.mMasters[uid];
        var ok = false;
        if(room)
        {
            ok = room.setRes()
        }
        var ret = {};
        if(!ok)
        {
            ret["code"] =  consts.NOR_CODE.ERR_FAIL;
            ret["status"] =  room.status;
        }
        next(null,ret);
    },
    clear:function(msg, uid,frontendId, next)
    {
        var room = this.DataCenter.mMasters[uid];
        var ok = false;
        if(room)
        {
            ok = room.clearRoom()
        }

        var ret = {};
        if(!ok)
        {
            ret["code"] =  consts.NOR_CODE.ERR_FAIL;
            ret["status"] =  room.status;
        }
        next(null,ret);
    },
    reCards:function(msg, uid,frontendId, next)
    {
        var room = this.DataCenter.mMasters[uid];
        var ok = false;
        if(room)
        {
            ok = room.ReSendCard()
        }
        var ret = {};
        if(!ok)
        {
            ret["code"] =  consts.NOR_CODE.ERR_FAIL;
            ret["status"] =  room.status;
        }
        next(null,ret);
    },
    changeXue:function(msg, uid,frontendId, next)
    {
        var room = this.DataCenter.mMasters[uid];
        var ok = false;
        if(room)
        {
            ok = room.changeXue()
        }
        var ret = {};
        if(!ok)
        {
            ret["code"] =  consts.NOR_CODE.ERR_FAIL;
            ret["status"] =  room.status;
        }
        next(null,ret);
    },
    setGameId:function(msg, uid,frontendId, next)
    {
        var gameId = msg.gid,deskId = msg.did,cfg=msg.cfg;
        var ok = this.DataCenter.initGameId(cfg,gameId,deskId,uid);
        if(ok)
        {
            var room = this.DataCenter.mGames[gameId][deskId];

            next(null,{r:room});
        }
        else
        {
            next(null,{code:consts.NOR_CODE.ERR_FAIL});
        }


    },
    subscriptGames:function(msg, uid,frontendId, next)
    {
        var gameIds = msg.gid, sType = msg.sType,sid = msg.sid;


        this.DataCenter.AddWatch(gameIds,sType,sid,frontendId);

        var ret = {},gid;
        for(var i=0;i<gameIds.length;i++)
        {
            gid = gameIds[i];
            ret[gid] = this.DataCenter.mGames[gid];
        }
        next(null,{g:ret});
    },
    forceRemoveRoom:function()
    {

    },
    onUserLeave:function(uid,next)
    {
        next();
        this.DataCenter.masterOffLine(uid);


    }
})


module.exports = function(app) {
    return new CPomelo.Remote.CRootGameRemote(app);
};