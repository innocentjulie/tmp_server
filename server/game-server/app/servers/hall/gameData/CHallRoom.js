/**
 * Created by z on 2018/1/17.
 */

require('../../../base/gameData/game/watch/CDataBaseWatchRoom');
require('../../../base/gameData/game/base/CBaseCard');
require('../../../base/gameData/game/base/CBaseResault');
var enums = require("../../../consts/enums");
var consts = require("../../../consts/consts");
Class({
    ClassName:"Game.Data.Game.CHallRoom",
    Base:"Game.Data.BaseRoom.CWatchBase",
    CardClass:Game.Data.Card.CBase,
    ResaultClass:Game.Data.CBaseResault,
    ctor:function()
    {
        Game.Data.BaseRoom.CWatchBase.prototype.ctor.apply(this,arguments);


        this.History = [];
        var channelName = this.gameId + "_" + this.deskId;
        var dataCenter = this.DataCenter;
        this.Channel = dataCenter.m_App.get('channelService').getChannel(channelName, true);
        dataCenter.AddRoomList(this);

    },

    AddWatch:function(uid,sid)
    {
        console.warn("add person hall room:"+uid);
        this.Channel.add(uid,sid);
    },
    RemoveWatch:function(uid,sid)
    {
        console.warn("remove person hall room:"+uid);
        this.Channel.leave(uid,sid);
    },
    toJSON:function()
    {
        var info = {
            cards:this.Cards,
            status:this.status,
            gameHistory:this.History,
            pots:this.Pots,

            gameType:this.GameType,
            nextWho:this.nextWho,
            pCount:this.PersonCount,
            deskId:this.deskId,
            gameId:this.gameId,
            xueIdx:this.xueIdx,
            cIdx:this.cIdx,
            betRecord:this.BetRecord,
            deskName:this.mDeskName,    // 桌子名称
            countDown:this.mCountDown, // 倒计时配置
            currentDown:this.mCurrentDown, // 当前到时间时间
            moudle:this.mMoudle          // 类型 1三合一 2电子台
        }

        console.warn(JSON.stringify(info))
        return info;
    }


})
