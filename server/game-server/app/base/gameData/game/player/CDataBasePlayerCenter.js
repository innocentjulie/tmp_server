/**
 * Created by z on 2018/1/5.
 */
require('./../watch/CDataBaseWatchCenter');
var enums = require("../../../../consts/enums");
var consts = require("../../../../consts/consts");
Class({
    ClassName:"Game.Data.Center.CPlayerBase",
    Base:"Game.Data.Center.CWatchBase",

    ctor:function(app,remote)
    {
        Game.Data.Center.CWatchBase.prototype.ctor.apply(this,arguments);


    },
    initPerson:function(uid,frontid,next)
    {
        var person = this.Persons[uid];
        if(person)
        {
            person.mSid = frontid;
            next(person);
        }
        else{



            ///
            var self = this;
            this.m_App.rpc.db.dbRemote.GetUser({uid:uid},uid,function(err,data){
                if(!err )
                {
                    console.warn("db get person ok:"+uid);
                    self.Persons[uid] = person = new self.PersonClass(uid,frontid,self,data);
                    next(person);
                }
                else{
                    next(null);
                }
            });
            ///
        }

    },


    joinRoom:function(gameId,deskId,qutotaId,seat,uid,frontendId,next)
    {


        var app = this.m_App;
        var self = this;

        var person = this.Persons[uid];
        if(person && person.mSid != -1)
        {
            next(null,{code:consts.GAME.COMMON.IN_ROOM_MORE_TIME});
            return;
        }
        this.initPerson(uid,frontendId,function(person)
        {
            if(person)
            {
                var oldQutoInfo = person.CurrentQutoInfo;
                if(person.CurrentDId != -1 && (person.CurrentDId != deskId || (oldQutoInfo && qutotaId != oldQutoInfo.Id)))
                {
                    next(null,{code:consts.GAME.COMMON.IN_OTHER_ROOM,deskid:person.CurrentDId,qid:person.CurrentQutoInfo.Id});
                    return;
                }

                var gList = self.mGames[gameId];
                if(gList )
                {

                    var room =gList[deskId];
                    var qutoInfo = room.m_Quota[qutotaId];
                    if(room && qutoInfo )
                    {


                        person.CurrentGId = gameId;
                        person.CurrentDId = deskId;

                        person.CurrentQutoInfo = qutoInfo;

                        /// gameId,deskId,seat,personInfo,next
                        console.warn("frontendId is:"+frontendId);
                        console.warn("person is:"+JSON.stringify(person.mData))
                        app.rpc.qutota.gameRemote.Seat({uid:deskId},deskId,qutotaId,seat,frontendId,person.mData,function(err,data){
                            if(data)
                            {
                                console.warn("seat back is:"+JSON.stringify(data));
                                var seat = data[0];
                                if(oldQutoInfo && oldQutoInfo.Id == qutoInfo.Id)
                                {
                                    qutoInfo.personReLogin(uid,frontendId,seat);
                                    console.warn("person.mData.seat is:"+person.mData.seat + " nseat:"+seat);
                                    person.mData.seat = seat;
                                }
                                else
                                {
                                    room.AddWatch(uid,frontendId,person,qutotaId,seat);
                                }

                                next(null,{p:person,r:room,seat:data[1]});
                            }
                            else
                            {
                                next(null,{code:consts.GAME.COMMON.NOT_ROOM});
                            }

                        })
                        return;
                    }


                }

            }
            console.warn("not person")
            next(null,{code:consts.GAME.COMMON.NOT_ROOM});
        })


    },
    leaveRoom:function( uid)
    {
        var person = this.Persons[uid] ;
        if(person )
        {
            var gameId = person.CurrentGId;
            var deskId = person.CurrentDId;
            var info = this.mGames[gameId] ;
            if(info)
            {
                var room = info[deskId];

                console.warn("player data center leave room"+gameId + "   my deskid is"+deskId );
                if(room)
                {
                    console.warn("have room" );
                    room.personTryLeave(uid, person.mSid,person.CurrentQutoInfo);

                }
                else
                {
                    console.warn("not have room" );
                }
            }
            else
            {
                console.warn("person deskid is:"+deskId);
            }


            person.mSid = -1;

        }
    },
    bet:function(uid,betInfo,next)
    {
        if(betInfo && betInfo instanceof Array)
        {
            var person =  this.Persons[uid] ;
            if(person)
            {
                var gameId = person.CurrentGId;
                var deskId = person.CurrentDId;
                var info = this.mGames[gameId] ;
                var room;
                var addDesk = false;
                if(info)
                {
                    room = info[deskId];
                    if(room)
                    {
                        room.bet(uid,person,betInfo,next);
                        return;
                        //if(resault)
                        //{
                        //    next(null,{money:resault[0]});
                        //    return;
                        //}

                    }

                }
            }
        }


        next(null,{code:consts.GAME.COMMON.NOT_ROOM});

    },
})