/**
 * Created by z on 2018/1/17.
 */
require('../../../base/gameData/game/watch/CDataBaseWatchCenter');
var enums = require("../../../consts/enums");

//require('./CPlayerBJLDataPerson');
require('./CQutoRoom');
require('./CQutoPerson');
Class({
    ClassName:"Game.Data.CQutoDataCenter",
    Base:"Game.Data.Center.CWatchBase",
    RoomClass:{
        "BJL":Game.Data.Game.CQutoRoom,
        "LH":Game.Data.Game.CQutoRoom
    },
    mGList:null,
    QuotaGames:["BJL","LH"],
    ctor:function()
    {
        this.mGList = {};
        Game.Data.Center.CWatchBase.prototype.ctor.apply(this,arguments);


    },
    subscriptQutota:function(infos)
    {
        var ret = {};
        var deskIds = infos.desks,did;
        for(var i=0;i<deskIds.length;i++)
        {
            did = deskIds[i];
            var deskInfo = this.mDesks[did];
            deskInfo.AddWatchers(infos.sType,infos.sid);
           ret[did] = deskInfo;
        }
        return ret;
    },
    pushGameInfo:function(watchers,deskId,fun,info)
    {
        if(watchers)
        {
            var sInfo;
            for(var i=0;i<watchers.length;i++)
            {
                sInfo = watchers[i];
                console.warn("fun"+fun + " key:"+JSON.stringify(info));
                this.m_App.rpc[sInfo[0]].gameRemote[fun]({sid:sInfo[1]},deskId,info,function(){})
            }
        }
        else
        {
            console.warn("---pushGameInfo  no push--");
        }
    },
    initPerson:function(uid,frontid)
    {
        var person = this.Persons[uid];
        if(!person)
        {

            person = new Game.Data.Game.CQutoPerson(uid,frontid,this);
            this.Persons[uid] = person;
        }
        person.mSid = frontid;

        return person;

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
        }

    },
    seat:function(deskId,quId,seat,frontendId,personInfo)
    {
        var deskInfo = this.mDesks[deskId];

        if(deskInfo )
        {
            var qutoInfo = deskInfo.m_Quota[quId];
            if(qutoInfo.mDeskPerson[seat] == personInfo.userid)
            {
                console.warn("joined a time")
                return[seat,qutoInfo];
            }
            if(qutoInfo)
            {
                deskInfo.mChange = true;
                var person = this.initPerson(personInfo.userid,-1) ;
                if(person.mData)
                {
                    //if(person.CurrentDId == deskId && person.mCurrentQuId == quId)
                    //{
                    //    return[person.mData.seat,qutoInfo];
                    //}
                    //return;
                    //var oldDesk = person.CurrentDId;
                    //var oldQuId = person.mCurrentQuId;
                    this.leaveRoom(personInfo.userid);
                }
                person.updateUserInfo(personInfo);
                person.CurrentDId =deskId;
                person.mCurrentQuId =quId;
                person.CurrentQutoInfo =qutoInfo;

                var seat =  deskInfo.m_Quota[quId].join(personInfo.userid,seat,person);
                return[seat,qutoInfo];
            }


        }

    },
})

