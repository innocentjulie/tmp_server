/**
 * Created by root on 3/8/17.
 */
require('../../../base/gameData/game/base/CBaseDataCenter');
var enums = require("../../../consts/enums");

require("./CDataRootBJL");
require("./CDataRootLH");
Class({
    ClassName:"Game.Data.CRGDataCenter",
    Base:"Game.Data.CBaseDataCenter",
    mGames:null,
    mWatchers:null,
    mMasters:null,
    ctor:function()
    {
        this.mGames = {
        }
        this.mWatchers = {};
        this.mMasters = {};
        Game.Data.CBaseDataCenter.prototype.ctor.apply(this,arguments);

        var rootGames = Game.Data.CFG.CConfigData.Instance.CFG.RootGame;
        var game = null;
       for(var key in rootGames)
       {
           game = rootGames[key];
           if(game)
           {
               this.initGameId(game,game.gameid,game.id,-1)
           }

       }
    },
    masterOffLine:function(uid)
    {
        var room = this.mMasters[uid];
        if(room)
        {
            room.masterOffLine();
            this.pushGameInfo(room.gameId,room.deskId,room.status,"masterOffLine");
            delete this.mMasters[uid];
        }
    },
    AddWatch:function(gameIds,severType,severId)
    {
        var ay;
        for(var i=0;i<gameIds.length;i++)
        {
            var gameId = gameIds[i];
            console.warn("AddWatch:"+gameId + " _" + severType + "_" +severId)
            ay = this.mWatchers[gameId] = this.mWatchers[gameId] || [];
            ay.push([severType,severId]);
        }


    },
    pushGameInfo:function(gameId,deskId,status,fun,info)
    {
        var ay = this.mWatchers[gameId];
        if(ay)
        {
            var sInfo;
            for(var i=0;i<ay.length;i++)
            {
                sInfo = ay[i];
                this.m_App.rpc[sInfo[0]].gameRemote[fun]({sid:sInfo[1]},gameId,deskId,status,info,function(){})
            }
        }
        this.pushGameInfoToAll(gameId,deskId,status,fun,info);
    },
    pushGameInfoToAll:function(gameId,deskId,status,fun,info)
    {
        var ay = this.mWatchers[-1];
        if(ay)
        {
            var sInfo;
            for(var i=0;i<ay.length;i++)
            {
                sInfo = ay[i];
                this.m_App.rpc[sInfo[0]].gameRemote[fun]({sid:sInfo[1]},gameId,deskId,status,info,function(){})
            }
        }

    },

    initGameId:function(cfg,gameId,deskId,masterid)
    {
        if(!gameId)
            return false;
        var info = this.mGames[gameId] || (this.mGames[gameId] = {});
        var room;
        var addDesk = false;
        if(info[deskId])
        {
            room = info[deskId];
        }
        else
        {
            var gameName = enums.Games[gameId];
            room = (info[deskId] = new Game.Data.Room[gameName](this,deskId,gameId));
            addDesk = true;
        }
        if(cfg)
        {
            room.Cfg = cfg;
        }

        if(masterid != -1)
        {
            var canOnline = room.masterOnLine(masterid);
            if(canOnline)
            {
                this.mMasters[masterid] = room;
            }
        }

        if(addDesk)
        {
            this.pushGameInfo(gameId,deskId,room.status,"newDesk",room);
        }
        else
        {
            this.pushGameInfo(gameId,deskId,room.status,"masterOnLine",masterid);
        }

        return canOnline;
    }

})