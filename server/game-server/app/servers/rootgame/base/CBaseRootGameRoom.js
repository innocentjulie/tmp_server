/**
 * Created by z on 2018/1/17.
 */
require("../../../base/gameData/game/base/CBaseGameRoom");
Class({
    ClassName:"Game.Data.Room.CRootBase",
    Base:"Game.Data.Room.CBase",
    Cfg:{
        set:function(v)
        {
            console.warn("--- init root room cfg----");
            if(v.name)
            {
                this.mDeskName = v.name; // 桌子名称
            }
            if(v.countdown)
            {
                this.mCountDown=v.countdown; // 倒计时配置
            }
            if(v.moudle)
            {
                this.mMoudle = v.moudle;           // 类型 1三合一 2电子台
            }
            if(v.streams)
            {
                this.mStreams = v.streams;     // 流id 列表
            }
            else if(!this.mStreams)
            {
                this.mStreams = [];
            }


            console.warn("this.mDeskName:"+this.mDeskName);
            console.warn("this.mCountDown:"+this.mCountDown);
            console.warn("this.mMoudle:"+this.mMoudle);
            console.warn("this.mStreams:"+this.mStreams);
        }
    },
    ctor:function()
    {
        Game.Data.Room.CBase.prototype.ctor.apply(this,arguments);
        this.mBetChange = true;
        this.updateToRootGameInfoTimer = setInterval(this.updateToPlayerServerGameInfo,1000,this);

        this.mCurrentDown = 0; // 当前到时间时间
        this.status = this.EnumsCfg.status.OFF_LINE;
        this.over();
    },
    updateToPlayerServerGameInfo:function()
    {
        if(this.mBetChange)
        {
            var pushInfo = {p:{},n:0};
            var posInfo = pushInfo.p;
            var tempSInfo = null;
            for(var sid in this.SeverBets)
            {
                tempSInfo = this.SeverBets[sid];
                pushInfo.n += tempSInfo.n;
                for(var pos in tempSInfo)
                {
                    if(posInfo.hasOwnProperty(pos))
                    {

                        posInfo[pos] = tempSInfo[pos];
                    }
                    else{
                        posInfo[pos] += tempSInfo[pos];
                    }
                }
            }
            console.warn(" --- updateToPlayerServerGameInfo ---- :"+JSON.stringify(pushInfo));
            this.DataCenter.pushGameInfo(this.gameId,this.deskId,this.status,"updateToPlayerServerGameInfo",pushInfo);
        }
        this.mBetChange = false;
    },
    updateInfoFromGameServer:function(sid,betInfo)
    {
        this.mBetChange = true;
        this.SeverBets[sid] = betInfo;
        console.warn(JSON.stringify(betInfo));
    },


    addPerson:function()
    {
        this.PersonCount++;
    },
    removePerson:function()
    {
        this.PersonCount--;
    },
    over:function()
    {
        this.status = this.EnumsCfg.status.FREE;

        this.SeverBets = {};
        this.Resault = null;
        this.Cards = {
            0:{},/// xian
            1:{} /// zhuang
        }
        this.nextWho = 0;


    },

    startBet:function(dt)
    {
        console.warn("startBet:"+this.status);
        if(this.status >= this.EnumsCfg.status.BEGIN_BET)
            return false;
        this.status = this.EnumsCfg.status.BEGIN_BET;
        this.Resault = null;
        this.Cards = {
            0:{},/// xian
            1:{} /// zhuang
        };
        this.nextWho = 0;
        this.mCurrentDown = dt;
        this.DataCenter.pushGameInfo(this.gameId,this.deskId,this.status,"startBet",{dt:dt});
        return true;
    },
    endBet:function()
    {
        console.warn("endbte:"+this.status);
        if(this.status == this.EnumsCfg.status.BEGIN_BET)
        {
            this.status = this.EnumsCfg.status.STOP_BET;
            this.Cards = {
                0:{},/// xian
                1:{} /// zhuang
            }
            //

            this.DataCenter.pushGameInfo(this.gameId,this.deskId,this.status,"endBet",{});
            return true;
        }
        return false;
    },
    ShowOneCard:function(pos,idx,value,nextPerson,nextPosition)
    {
        console.warn("ShowOneCard status:"+this.status);
        if(this.status == this.EnumsCfg.status.STOP_BET || this.status == this.EnumsCfg.status.SHOW_CARD)
        {
            this.status = this.EnumsCfg.status.SHOW_CARD;
            var posInfo =this.Cards[pos];
            if(posInfo)
            {

                if(value == -1)
                {
                    delete posInfo[idx];
                }
                else
                {
                    //if(Game.Helper.CBJLHelper.Instance["MustNotAddCards"+idx](this.Cards[0],this.Cards[1]))
                    //{
                    //    return false;
                    //}
                    posInfo[idx] =  new this.CardClass(value);
                }
                this.nextWho = nextPerson;

                this.DataCenter.pushGameInfo(this.gameId,this.deskId,this.status,"ShowOneCard",{pos:pos,idx:idx,value:value,nextPerson:nextPerson,nextPosition:nextPosition});
                return true;
            }
        }
        return false;

    },
    setRes:function()
    {
        if(this.status != this.EnumsCfg.status.SHOW_CARD)
        {
            return false;
        }

        this.status = this.EnumsCfg.status.RESAULT;

        var ret = Game.Data.Resault[this.GameType].Resault(this.Cards[1],this.Cards[0]);
        this.History.push(ret);

        ////
        this.HistoryDao.CreateData(parseInt(Date.now()/1000),this.deskId,this.deskId,parseInt(Date.now()/1000),ret)

        this.DataCenter.pushGameInfo(this.gameId,this.deskId,this.status,"setRes",{value:ret});
        setTimeout(this.over,1000*1,this);
        return true;
    },
    ReSendCard:function()
    {
        if(this.status != this.EnumsCfg.status.SHOW_CARD)
            return false;
        console.warn("re send cards");
        this.Cards = {
            0:{},
            1:{}
        }
        this.DataCenter.pushGameInfo(this.gameId,this.deskId,this.status,"ReSendCard",{});
        return true;
    },
    changeXue:function()
    {
        if(this.status != this.EnumsCfg.status.FREE && this.status != this.EnumsCfg.status.INIT_CARD)
            return false;

        this.status = this.EnumsCfg.status.INIT_CARD;
        //xueIdx:this.xueIdx,this.History
        //cIdx:this.cIdx,
        this.xueIdx++;
        this.History = [];
        this.cIdx = 0;

        this.DataCenter.pushGameInfo(this.gameId,this.deskId,this.status,"changeXue",{x:this.xueIdx,cIdx:this.cIdx});
        return true;
    },
    clearRoom:function()
    {
        if(this.canClearCheckStatus(this.status))
        {
            this.over();
            console.warn("clearRoom");
            this.DataCenter.pushGameInfo(this.gameId,this.deskId,this.status,"clearRoom",{});
            return true;
        }
        return false;

    }
})