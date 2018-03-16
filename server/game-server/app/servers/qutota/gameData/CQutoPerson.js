/**
 * Created by z on 2018/1/17.
 */

require('../../../base/gameData/game/base/CBaseGamePerson');
Class({
    ClassName:"Game.Data.Game.CQutoPerson",
    Base:"Game.Data.Game.CBasePerson",
    mCurrentGameId:-1,
    mDeskIds:null,
    mSid:-1,
    toJSON:function()
    {
        return this.mData;
    },
    ctor:function()
    {

        Game.Data.Game.CBasePerson.prototype.ctor.apply(this,arguments);
       
        this.mDeskIds = [];
    },
    updateUserInfo:function(info)
    {
        this.mData = info;
    },

    AddWatchList:function(deskids,deskCache)
    {
        var deskId,room ;
        var ret = [];
        for(var i =0;i<deskids.length;i++)
        {
            deskId = deskids[i];
            room = deskCache[deskId];
            if(room)
            {
                ret.push(room);
                room.AddWatch(this.userid,this.mSid);
                this.mDeskIds.push(deskId);
            }
        }
        return ret;
    },
    ClearWatch:function(deskCache)
    {

        var deskids = this.mDeskIds,deskId,room;
        for(var i =0;i<this.mDeskIds.length;i++)
        {

            deskId = this.mDeskIds[i];
            room = deskCache[deskId];
            if(room)
            {
                room.RemoveWatch(this.userid,this.mSid);
            }
        }

        this.mDeskIds = [];
    }

})