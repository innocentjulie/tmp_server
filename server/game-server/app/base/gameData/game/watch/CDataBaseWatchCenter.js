/**
 * Created by z on 2018/1/19.
 */
/**
 * Created by z on 2018/1/5.
 */
require('../base/CBaseDataCenter');
var enums = require("../../../../consts/enums");
var consts = require("../../../../consts/consts");
require('./CDataQuotaCenter');
Class({
    ClassName:"Game.Data.Center.CWatchBase",
    Base:"Game.Data.CBaseDataCenter",

    PersonClass:null,
    //QuotaCenter:null,
    mDesks:null,
    ctor:function(app,remote)
    {
        Game.Data.CBaseDataCenter.prototype.ctor.apply(this,arguments);
        this.Persons = {};
        this.mDesks = {};
        //this.QuotaCenter = new Game.Data.Center.CDataQuotaCenter(app,remote);
        //this.QuotaCenter.initQuota(this.QuotaGames);
    },



    initGameId:function(gameId,deskId,status,roomInfo)
    {

        if(!gameId)
            return false;
        var info = this.mGames[gameId] || (this.mGames[gameId] = {});
        var room;
        if(info[deskId])
        {
            room = info[deskId];
        }
        else
        {
            var gameName = enums.Games[gameId];
            var classF = this.RoomClass[gameName];
            if(classF)
            {
                room = (info[deskId] = new this.RoomClass[gameName](this,deskId,gameId));
                room.updateInfo(roomInfo);
                this.mDesks[deskId] = room
            }
            else
            {
                console.warn(classF.ClassName)
            }

        }

        console.warn(JSON.stringify(this.mGames));

    },
    safeGetRoom:function(gameId,deskId)
    {
        var rooms = this.mGames[gameId];
        if(rooms)
        {
            var room = rooms[deskId];
            return room;
        }
        return null;
    },
    WinType:function(type,userid,money)
    {

    },
    LoseType:function(type,userid,money)
    {

    },
})