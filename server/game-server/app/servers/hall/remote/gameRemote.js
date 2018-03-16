/**
 * Created by z on 2018/1/17.
 */
require('../../../base/servers/game/watch/CBaseWatchRemote');
require('../gameData/CHallDataCenter');


Class({
    ClassName:"CPomelo.Remote.CHallRemote",
    Base:"CPomelo.Remote.CBaseWatchRemote",
    SubGames:[1,2],
    DataCenterName:"CHallDataCenter",
    subscriptGames:function(msg, uid,frontendId, next)
    {
        var deskIds = msg.deskids || [];

        console.warn("subscriptGames id:"+deskIds);
       var ret = this.DataCenter.AddWatch(deskIds,uid,frontendId);
        console.warn(JSON.stringify("subscriptGames value is:"+JSON.stringify(ret)))
        next(null,{g:ret});

    },
    GList:function(msg, uid,frontendId, next)
    {

        next(null,{l:this.DataCenter.mGList})
    },
    GQuto:function(msg,uid,frontid,next)
    {
        var deskId = msg.deskid;
       var room = this.DataCenter.mDesks[deskId];
        if(room)
        {
            next(null,{q:room.m_Quota})
        }
        else
        {
            next(null,{})
        }


    },
    ///// gameId,qutotaId,seat,frontendId,person
    joinRoom:function(deskId,quId,seat,frontid,info,next)
    {
        this.DataCenter.joinRoom(deskId,quId,seat,frontid,info);
        next();
    },
    leave:function(msg,uid,frontendId, next)
    {
        this.DataCenter.leaveRoom(uid);
        next();
    },
    bet:function(msg)
    {
        var uid = msg[0],pos = msg[1],money=msg[2],livemoney=msg[3];
        var dataCenter = this.DataCenter;
        var person = dataCenter.Persons[uid];

        var room = dataCenter.mDesks[person.CurrentDId];
        if(room)
        {
            var qutoData = room.m_Quota[person.mCurrentQuId];
            if(qutoData)
            {
                person.mData.livemoney = livemoney;
                qutoData.ForeceSetBet(person.mData.seat,pos,money,livemoney);
            }
        }

    }
})

module.exports = function(app) {
    return new CPomelo.Remote.CHallRemote(app);
};