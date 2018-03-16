/**
 * Created by z on 2018/1/19.
 */


require("../../../../core/Core");
var enums = require("../../../../consts/enums");
Class({
    ClassName:"Game.Data.Room.Qutota",
    Id:null,
    mData:null,
    mRoom:null,
    mSaveSeat:false,
    mChange:null,
    ctor:function(info,room)
    {
        this.mRoom = room;
        this.mData = {
            max:info.max,
            min:info.min
        };
        this.mData.seat = 0;
        this.Id = info.id;
        this.mDeskPerson = {};

        this.mSeatCfg = {
            1:0,
            2:0,
            3:0,
            4:0,
            5:0,
            7:0,
            8:0
        }
    },
    DataCenter:{
        get:function()
        {
            if(this.mRoom)
            {
                return this.mRoom.DataCenter;
            }
            return null;
        }
    },
    FreeSeatId:{
        get:function()
        {

            if(!this.mSaveSeat)
                return -1;
            for(var key in this.mSeatCfg)
            {

                console.warn("mSeatCfg key:"+key);
                if(!this.mDeskPerson[key])
                {
                    return parseInt(key);
                }

            }
            return -1;
        }
    },
    initChannal:function()
    {

        var channelName = "quto_"+this.mRoom.deskId+"_"+this.Id;
        var dataCenter = this.DataCenter;
        this.Channel = dataCenter.m_App.get('channelService').getChannel(channelName, true);
        console.warn(this.mRoom.constructor.ClassName + " init quto  channel:"+channelName);

    },
    takeChange:function()
    {
        var info = this.mChange;
        this.mChange = null;
        return info;
    },
    ResetQutoInfo:function(info)
    {
        for(var pid in info)
        {
            this.mDeskPerson[pid] = info[pid];
        }
    },
    updateSameDeskInfo:function(info)
    {
        for(var pid in info)
        {
            if(info[pid])
                this.mDeskPerson[pid] = info[pid];
            else
                delete this.mDeskPerson[pid];
        }
        if(this.Channel)
        {
            var pushInfo = {};
            var tempInfo = {
                player:info,
                deskId:this.mRoom.deskId
            };
            pushInfo["updateDeskInfo"] = tempInfo;
            this.Channel.pushMessage(enums.PUSH_KEY.PUSH,pushInfo, Core.errHandler);
        }
    },
    ForceRemovePerson:function(pids)
    {
        if(!this.mChange)
        {
            this.mChange = {};
        }
        for(var i=0;i<pids.length;i++)
        {
            var pid = pids[i];
            delete this.mDeskPerson[pid];
            this.mData.seat &= ~(0x1<<pid);
            this.mChange[pid] = null;
        }
    },
    offLinePerson:function(uid,sid)
    {
        this.Channel.leave(uid,sid)
        console.warn("quto remove person:"+uid);
    },
    personReLogin:function(uid,sid)
    {
        this.Channel.add(uid,sid)
        console.warn("quto add person:"+uid);
    },
    join:function(uid,pid,person)
    {

        if(pid == -1)
        {
            pid = this.FreeSeatId;
            console.warn("FreeSeatId pid:"+pid);
        }
        if(!this.mDeskPerson[pid] && this.mSeatCfg.hasOwnProperty(pid))
        {

            console.warn("quto person is:"+person.userid);
            this.mDeskPerson[pid] = person;
            this.mData.seat |= 0x1<<pid;

            if(!this.mChange)
            {
                this.mChange = {};
            }
            this.mChange[pid] = person;
        }


        person.mData.seat = pid;
        if(this.Channel)
        {
            this.Channel.add(uid,person.mSid);

            console.warn("quto add person:"+uid);
            //var pinfo = {};
            //pinfo["initDeskInfo"] = this.mDeskPerson;
            //person.push(pinfo);
        }
        return pid;
    },
    leave:function(uid,person)
    {
        var pid = person.mData.seat;
        var info = this.mDeskPerson[pid];
        if(info && info.userid==uid)
        {
            delete this.mDeskPerson[pid];
            this.mData.seat &= ~(0x1<<pid);

            if(!this.mChange)
            {
                this.mChange = {};
            }
            this.mChange[pid] = null;
        }
        if(this.Channel )
        {
            this.Channel.leave(uid,person.mSid)
        }

    },
    ForeceSetBet:function(seat,pos,money,liveMoney)
    {
        if(this.mSeatCfg.hasOwnProperty(seat))
        {
            var bet = this.mBetInfo[seat] || (this.mBetInfo[seat]={});
            if(bet)
            {
                bet[pos] = money;
                //var info = {};
                //var push = {};
                //push["bet"] = bet;
                //push["livemoney"] = liveMoney;
                //info["updateDeskInfo"] = push;
                //this.Channel.pushMessage(enums.PUSH_KEY.PUSH,info , Core.errHandler);
            }

        }
    },
    clearBet:function()
    {
        this.mBetInfo = {};
    },
    toJSON:function()
    {
        return this.mData;
    }
})


//for(var i=1;i<4;i++)
//{
//    for(var j=2;j<15;j++)
//    {
//        var num = i<<4|j;
//        Cards.push(new CCard(num));
//    }
//}