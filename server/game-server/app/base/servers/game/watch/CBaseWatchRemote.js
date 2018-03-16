/**
 * Created by z on 2018/1/4.
 */
require('../CBaseGameRemote');


Class({
    ClassName:"CPomelo.Remote.CBaseWatchRemote",
    Base:"CPomelo.Remote.CBaseGameRemote",
    SubGames:null,
    onInit:function()
    {
        CPomelo.Remote.CBaseGameRemote.prototype.onInit.apply(this,arguments);

        setTimeout(this.toSubscriptGames,1000*6,this);


    },

    toSubscriptGames:function()
    {

        var info = this.m_App.getCurServer();
        if(this.SubGames)
        {
           var myInfo = {
               gid:this.SubGames,
               sType:info.serverType,
               sid:info.id
           };
            var self = this;
            this.m_App.rpc.rootgame.gameRemote.subscriptGames({uid:"0"},myInfo,"0",info.id,function(err,data){
                var gInfo,desk;

                data = data.g;
               for(var key in data){
                   gInfo = data[key]
                   for(var deskid in gInfo)
                   {
                       desk = gInfo[deskid];

                       self.newDesk(desk.gameId,desk.deskId,desk.status,desk,function(){});
                   }

               }

                setTimeout(self.toSubscriptQutoInfo,5000,self);
            });
        }

    },
    initQutoIds:function()
    {
        this.SubQutoRooms = Object.keys(this.DataCenter.mDesks);
    },
    toSubscriptQutoInfo:function()
    {
        this.initQutoIds();
        var info = this.m_App.getCurServer();
        if(this.SubQutoRooms)
        {


            var myInfo = {
                desks:this.SubQutoRooms,
                sType:info.serverType,
                sid:info.id
            };
            var self = this;
            var dataCenter = self.DataCenter;
            this.m_App.rpc.qutota.gameRemote.subscriptQutota({sid:"qutota-1"},myInfo,function(err,data){
                for(var did in data)
                {
                    var quInfo = data[did];
                    dataCenter.mDesks[did].ResetQutoInfo(quInfo);
                }
            });
        }
    },
    updateToWatchServerQutoChange:function(deskId,changeInfo,next)
    {
        next();
        var room = this.DataCenter.mDesks[deskId];
        if(room)
        {
            room.updateSameDeskInfo(changeInfo);
        }
    },
    newDesk:function(gameId,deskId,status,info,next)
    {
        next();

        this.DataCenter.initGameId(gameId,deskId,status,info);
    },
    masterOnLine:function(gameId,deskId,status,masterid,next)
    {
        next();
        var room = this.DataCenter.safeGetRoom(gameId,deskId);
        if(room)
        {


            room.masterOnLine(masterid);
            room.pushGameInfo(gameId,deskId,"masterOnLine",{});
        }
        else
        {

        }


    },
    masterOffLine:function(gameId,deskId,status,info,next)
    {
        next();
        var room = this.DataCenter.safeGetRoom(gameId,deskId);
        if(room)
        {
            room.masterOffLine();
            room.pushGameInfo(gameId,deskId,"masterOffLine",{});
        }
        else
        {
        }

    },
    startBet:function(gameId,deskId,status,info,next)
    {
        next();
        var room = this.DataCenter.safeGetRoom(gameId,deskId);
        if(room)
        {
            room.startBet(info.dt,status)
        }
    },
    endBet:function(gameId,deskId,status,info,next)
    {
        next();
        var room = this.DataCenter.safeGetRoom(gameId,deskId);
        if(room)
        {
            room.endBet(status)
        }
    },
    ShowOneCard:function(gameId,deskId,status,info,next)
    {
        next();
        var room = this.DataCenter.safeGetRoom(gameId,deskId);
        if(room)
        {
            room.ShowOneCard(info.pos,info.idx,info.value,info.nextPerson,info.nextPosition,status)
        }

    },
    setRes:function(gameId,deskId,status,info,next)
    {
        next();
        var room = this.DataCenter.safeGetRoom(gameId,deskId);
        if(room && room.setRes)
        {
            room.setRes(info.value,status)
        }
    },
    ReSendCard:function(gameId,deskId,status,info,next)
    {
        next();
        var room = this.DataCenter.safeGetRoom(gameId,deskId);
        if(room)
        {
            room.ReSendCard(status)
        }

    },
    changeXue:function(gameId,deskId,status,info,next)
    {
        next();
        var room = this.DataCenter.safeGetRoom(gameId,deskId);
        if(room)
        {
            room.changeXue(info,status);
        }

    },

    clearRoom:function(gameId,deskId,status,info,next)
    {
        next();
        var room = this.DataCenter.safeGetRoom(gameId,deskId);
        if(room)
        {
            room.clearRoom(status)
        }
    },
    updateToPlayerServerGameInfo:function(gameId,deskId,status,info,next)
    {

        next();
        console.warn("updateToPlayerServerGameInfo -- "+ gameId + "   " +deskId);
        var room = this.DataCenter.safeGetRoom(gameId,deskId);
        if(room)
        {
            if(room.updateGameInfoToPlayer)
            {

                console.warn("room update info -- 0");
            }
            else
            {

                console.warn("room update info -- 1");
                room.updateGameInfoToPlayer(info)
            }
        }
    }
})


