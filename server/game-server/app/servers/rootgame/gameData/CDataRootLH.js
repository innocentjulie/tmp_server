/**
 * Created by z on 2018/1/4.
 */

var enums = require("../../../consts/enums");
require("../base/CBaseRootGameRoom");
require("../../../base/gameData/game/lh/CLHHelper");
require("../../../base/gameData/game/lh/CLHCard");
require("../../../base/gameData/game/lh/CLHResault");

Core.$AlwaysDefines("Game.Const.Eunms.Room.LH",{

    status:{
        OFF_LINE:-1,
        FREE:0,
        INIT_CARD:1,
        BEGIN_BET:2,
        STOP_BET:3,
        SHOW_CARD:4,
        RESAULT:5,
        OVER:6
    }
})
Class({
    ClassName:"Game.Data.Room.LH",
    Base:"Game.Data.Room.CRootBase",
    GameType:"LH",
    Resault:null,
    Cards:null,
    History:null,
    Pots:null,

    nextWho:0,
    PersonCount:0,
    mMasterId:null,
    CardClass:Game.Data.Card.LH,
    EnumsCfg:Game.Const.Eunms.Room.LH,
    HistoryDao:require("../../../dao/gameresaultLHDao"),
    canClearCheckStatus:function(status)
    {
        var cfg = Game.Const.Eunms.Room.LH.status;
        if(status<cfg.BEGIN_BET || status ==  cfg.OVER)
        {
            return true;
        }
        return false;
    }
})