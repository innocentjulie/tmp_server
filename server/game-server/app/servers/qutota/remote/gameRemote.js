/**
 * Created by z on 2018/1/17.
 */
require('../../../base/servers/game/watch/CBaseWatchRemote');
require('../gameData/CQutoDataCenter');


Class({
    ClassName:"CPomelo.Remote.CQutoRemote",
    Base:"CPomelo.Remote.CBaseWatchRemote",
    SubGames:[1,2],
    DataCenterName:"CQutoDataCenter",
    SubQutoRooms:null,

    subscriptQutota:function(info,next)
    {

        var ret = this.DataCenter.subscriptQutota(info);
        console.warn(JSON.stringify(ret));
        next(null,ret);
    },

    initQutoIds:function()
    {

    },
    ForceRemovePerson:function(deskId,qInfo,next)
    {
        next();
        var room = this.DataCenter.mDesks[deskId];
        if(room)
        {
            room.ForceRemovePerson(qInfo);
        }
    },
    bet:function(msg,next)
    {
        next();
        var uid = msg[0],pos = msg[1],money=msg[2],livemoney=msg[3];
        var dataCenter = this.DataCenter;
        var person = dataCenter.Persons[uid];

        var room = dataCenter.mDesks[person.CurrentDId];
        if(room)
        {
            var qutoData = room.m_Quota[person.mCurrentQuId];
            if(qutoData)
            {
                room.mChange = true;
                person.mData.livemoney = livemoney;
                qutoData.ForeceSetBet(person.mData.seat,pos,money,livemoney);
            }
        }

    },
    startBet:function(gameId,deskId,status,info,next)
    {
        next();
    },
    endBet:function(gameId,deskId,status,info,next)
    {
        next();
    },
    ShowOneCard:function(gameId,deskId,status,info,next)
    {
        next();
    },
    ReSendCard:function(gameId,deskId,status,info,next)
    {
        next();
    },
    onGameInfo:function(gameId,deskId,status,info,next)
    {
        next();
    },

    Seat:function(deskId,qutotaId,seat,frontendId,personInfo,next)
    {
        //  deskId,quId,seat,frontendId,personInfo
        next(null,this.DataCenter.seat(deskId,qutotaId,seat,frontendId,personInfo));
    }
})

module.exports = function(app) {
    return new CPomelo.Remote.CQutoRemote(app);
};