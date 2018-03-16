/**
 * Created by z on 2017/12/28.
 */





    /////////////////////////////////////////////////////////////////
var enums = require("../../../consts/enums");

require("../../../base/gameData/game/bjl/CBJLHelper");
require("../../../base/gameData/game/bjl/CBJLCard");
require("../../../base/gameData/game/bjl/CBJLResault");
require("../base/CBaseRootGameRoom");

Core.$AlwaysDefines("Game.Const.Eunms.Room.BJL",{

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
    ClassName:"Game.Data.Room.BJL",
    Base:"Game.Data.Room.CRootBase",
    GameType:"BJL",
    Resault:null,
    Cards:null,
    History:null,
    Pots:null,

    nextWho:0,
    PersonCount:0,
    mMasterId:null,
    CardClass:Game.Data.Card.BJL,
    EnumsCfg:Game.Const.Eunms.Room.BJL,
    HistoryDao:require("../../../dao/gameresaultBaccDao"),
    canClearCheckStatus:function(status)
    {
        var cfg = Game.Const.Eunms.Room.BJL.status;
        if(status<cfg.BEGIN_BET || status ==  cfg.OVER)
        {
            return true;
        }
        return false;
    }


})