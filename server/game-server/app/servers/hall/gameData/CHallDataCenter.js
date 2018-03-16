/**
 * Created by z on 2018/1/17.
 */
require('../../../base/gameData/game/watch/CDataBaseWatchCenter');
var enums = require("../../../consts/enums");

//require('./CPlayerBJLDataPerson');
require('./CHallRoom');
require('./CHallPerson');
Class({
    ClassName:"Game.Data.CHallDataCenter",
    Base:"Game.Data.Center.CWatchBase",
    RoomClass:{
        "BJL":Game.Data.Game.CHallRoom,
        "LH":Game.Data.Game.CHallRoom
    },
    mGList:null,
    QuotaGames:["BJL","LH"],
    ctor:function()
    {
        this.mGList = {};
        Game.Data.Center.CWatchBase.prototype.ctor.apply(this,arguments);


    },
    AddRoomList:function(room)
    {
        var ay = this.mGList[room.gameId] || (this.mGList[room.gameId] = []);
        ay.push(room.deskId);

    },
    initPerson:function(uid,frontid)
    {
        var person = this.Persons[uid];
        if(!person)
        {

            person = new Game.Data.Game.CHallPerson(uid,frontid,this);
            this.Persons[uid] = person;
        }
        person.mSid = frontid;
        return person;

    },
    AddWatch:function(deskids,uid,frontid)
    {
        var person = this.initPerson(uid,frontid,this) ;
        if(person)
        {
            person.ClearWatch(this.mDesks);
            return person.AddWatchList(deskids,this.mDesks);
        }
        return null;
    },
    leaveRoom:function( uid)
    {
        var person = this.Persons[uid] ;
        if(person )
        {
            var deskInfo = this.mDesks[person.CurrentDId];
            if(deskInfo)
            {
                var qutoData = deskInfo.m_Quota[person.mCurrentQuId];
                if(qutoData)
                    qutoData.leave(uid,person);
            }

            person.ClearWatch(this.mDesks);
            person.CurrentDId = -1;
            person.mSid = -1;
            person.mCurrentQuId = -1;
        }

    },
    joinRoom:function(deskId,quId,seat,frontid,info)
    {
        var person = this.initPerson(info.userid,frontid,this) ;
        if(person )
        {
            var deskInfo = this.mDesks[deskId];
            person.updateUserInfo(info);
            person.CurrentDId =deskId;
            person.mCurrentQuId =quId;
            deskInfo.m_Quota[quId].join(info.userid,seat,person);

            // uid,gameType,quid,pid,person
            //this.QuotaCenter.joinRoom(info.userid,deskInfo.gameId,quId,seat,person);

        }

    },
})

