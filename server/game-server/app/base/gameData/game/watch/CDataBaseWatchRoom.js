/**
 * Created by z on 2018/1/5.
 */

require('../base/CBaseGameRoom');

var enums = require("../../../../consts/enums");
var consts = require("../../../../consts/consts");
require('./CDataQutota');
Class({
    ClassName:"Game.Data.BaseRoom.CWatchBase",
    Base:"Game.Data.Room.CBase",
    ResaultClass:null,
    Resault:null,
    Cards:null,
    History:null,
    Pots:null,

    nextWho:0,
    PersonCount:0,
    mMasterId:null,
    mCurrentRoomCount:0,
    mMasterName:{
        get:function()
        {
            return this.mMasterId;
        }
    },
    mQutoHasChannel:false,
    mGameIdx:null,
    mCurrentId:{
        get:function()
        {
            return this.__mCurrentId;
        },
        set:function(v)
        {
            this.__mCurrentId =this.deskId+ "_"+parseInt(Date.now()/1000)
        }
    },
    mCurrentDown:{
        set:function(v)
        {
            this.__mCurrentDown = v;
            if(v>0)
            {
                this.resetBetTimer();
            }
            else if(this.mBetTimerInterval)
            {
                clearInterval(this.mBetTimerInterval);
                this.mBetTimerInterval = 0;
            }
        },
        get:function()
        {
            return this.__mCurrentDown;
        }
    },

    ctor:function()
    {
        Game.Data.Room.CBase.prototype.ctor.apply(this,arguments);


        this.resetRateCfg();
        ////
        this.mBetChange = false;
        this.mCanBet = false;
        this.updateToRootGameInfoTimer = setInterval(this.updateToRootGameInfo,1000,this);
        this.over(0);

        this.initQuota();
    },
    initQuota:function()
    {
        var cfg = Game.Data.CFG.CConfigData.Instance.CFG;
        var gid = this.gameId;

        var glist = cfg["limit_{0}".Format(enums.Games[gid])];

        var tempQuo = this.m_Quota = {};
        for(var id in glist)
        {
            tempQuo[id] = new Game.Data.Room.Qutota(glist[id],this);
            if(this.mQutoHasChannel)
            {
                tempQuo[id].initChannal();
            }
        }
    },
    ResetQutoInfo:function(infos)
    {
        for(var qid in infos)
        {
            this.m_Quota[qid].ResetQutoInfo(infos[qid]);
        }
    },
    updateSameDeskInfo:function(infos)
    {
        for(var qid in infos)
        {
            this.m_Quota[qid].updateSameDeskInfo(infos[qid]);
        }
    },
    resetBetTimer:function()
    {
        if(this.mBetTimerInterval)
        {
            clearInterval(this.mBetTimerInterval);
        }
        this.mBetTimerInterval =  setInterval(this.updateBetTimer,1000,this);
    },
    updateBetTimer:function()
    {
        if(this.__mCurrentDown>1)
        {
            this.__mCurrentDown--;
        }
    },
    // uid,frontendId,person,qutotaId,seat
    AddWatch:function(uid,sid,person,qutoid,seat)
    {
        this.mCurrentRoomCount++;
        if(person)
        {
            var quoData = this.m_Quota[qutoid];
            if(quoData)
            {
                person.mCurrentQuId = qutoid;
                quoData.join(person.userid,seat,person);
            }

        }


    },
    RemoveWatch:function(uid)
    {
        this.mCurrentRoomCount--;

        var person = this.DataCenter.Persons[uid];

        console.warn("basewatch room RemoveWatch:"+person.CurrentDId + "   my deskid is"+this.deskId );
        if(person.CurrentDId == this.deskId)
        {
            var quId = person.mCurrentQuId;
            var quoData = this.m_Quota[quId];
            if(quoData)
            {
                quoData.leave(uid,person);
            }
            person.CurrentDId = -1;
        }



    },
    updateRoomBetInfo:function(pos,money,newPerson)
    {
        var mPos = this.BetRecord.p;
        var num = this.BetRecord.n || 0;
        if(mPos.hasOwnProperty(pos))
        {
            mPos[pos]+=money;

        }
        else
        {
            mPos[pos]=money;
        }

        this.BetRecord.n = num+newPerson;
        this.mBetChange = true;
    },
    getBetHis:function(uid)
    {
        var ret = {};
        var mPos = this.BetRecord.p;
        var num = this.BetRecord.n;
        for(var pos in mPos)
        {
            ret[pos] = mPos[pos][uid];
        }
        return ret;
    },
    updateToRootGameInfo:function()
    {

        if(this.mBetChange)
        {
            console.warn("--- updateToRootGameInfo -- ")
            this.m_App.rpc.rootgame.gameRemote.updateInfoFromGameServer({uid:"0"},this.m_App.getServerId(),this.gameId,this.deskId,this.BetRecord,function(err,data){ });
        }
        this.mBetChange = false;
    },
    //join:function(uid,rid, next)
    //{
    //    var dataCenter = this.DataCenter;
    //    dataCenter.initPerson(uid,rid, next);
    //},
    //onUserLeave:function(uid,next)
    //{
    //    next();
    //
    //},
    over:function(status)
    {
        this.status = status;
        this.Resault = null;
        this.Cards = null
        this.nextWho = 0;
        this.mCanBet = false;
        this.mCurrentDown = 0;
        this.resetBetCfg();
        this.mCurrentId = 1;
    },
    resetRateCfg:function()
    {

    },
    resetBetCfg:function()
    {
        for(var key in this.m_Quota)
        {
            this.m_Quota[key].clearBet();
        }
    },

    startBet:function(dt,status)
    {
        this.status = status;
        this.Resault = null;
        this.Cards = null;
        this.nextWho = 0;
        this.mCanBet = true;
        this.mCurrentDown = dt;
        this.pushGameInfo(this.gameId,this.deskId,"startBet",{dt:dt,cIdx:this.cIdx});
        return true;
    },
    endBet:function(status)
    {
        this.mCanBet = false;
        this.status = status;
        this.Cards = {
            0:{},/// xian
            1:{} /// zhuang
        }
        this.pushGameInfo(this.gameId,this.deskId,"endBet",{});
    },


    ShowOneCard:function(pos,idx,value,nextPerson,nextPosition,status)
    {
        this.status = status;
        var posInfo =this.Cards[pos];
        if(posInfo)
        {
            if(value == -1)
            {
                delete posInfo[idx];
            }
            else
            {
                posInfo[idx] = new this.CardClass(value);
            }
            this.nextWho = nextPerson;
            this.pushGameInfo(this.gameId,this.deskId,"ShowOneCard",{pos:pos,idx:idx,value:value,nextPerson:nextPerson,nextPosition:nextPosition});
        }

    },
    setRes:function(face,status)
    {

        var value = new this.ResaultClass(face);
        if(this.History)
            this.History.push(value);
        this.status = status;
        this.pushGameInfo(this.gameId,this.deskId,"setRes",{value:value});

        setTimeout(this.over,1000,this);
        return value;
    },
    ReSendCard:function(status)
    {

        this.status = status;
        this.Cards = {
            0:{},
            1:{}
        }
        this.pushGameInfo(this.gameId,this.deskId,"ReSendCard",{});
        return true;
    },
    changeXue:function(info,status)
    {
        this.status = status;
        this.xueIdx = info.x;
        this.History = [];
        this.cIdx = info.cIdx;
        this.pushGameInfo(this.gameId,this.deskId,"changeXue",info);
        return true;
    },
    updateGameInfoToPlayer:function(msg)
    {
        console.warn("onGameInfo");
        this.pushGameInfo(this.gameId,this.deskId,"onGameInfo",msg);
    },
    clearRoom:function(status)
    {
        this.over(status);
        this.pushGameInfo(this.gameId,this.deskId,"clearRoom",{});
        return true;
    },
    updateInfo:function(msg)
    {
        this.status = msg.status;
        if(this.History)
            this.History = msg.gameHistory || [];
        this.Pots = msg.pots;

        this.nextWho = msg.nextWho;
        this.PersonCount = msg.pCount;
        this.xueIdx = msg.xueIdx;
        this.cIdx = msg.cIdx;


        this.mDeskName = msg.deskName;    // 桌子名称
        this.mCountDown=msg.countDown; // 倒计时配置
        this.mCurrentDown = msg.currentDown; // 当前到时间时间
        this.mMoudle = msg.moudle;           // 类型 1三合一 2电子台
        this.mStreams = msg.streams;     // 流id 列表



    },
    toJSON:function()
    {
        return { }
    }


})