/**
 * Created by z on 2018/1/5.
 */
require('../../../base/gameData/game/player/CDataBasePlayerRoom');
var enums = require("../../../consts/enums");
require('../../../base/gameData/game/bjl/CBJLCard');
require('../../../base/gameData/game/bjl/CBJLResault');
require('../../../base/gameData/game/bjl/CBJLHelper');
Class({
    ClassName:"Game.Data.Game.CPlayerBJLRoom",
    Base:"Game.Data.BaseRoom.CPlayerBase",
    GameType:"BJL",
    CardClass:Game.Data.Card.BJL,
    ResaultClass:Game.Data.Resault.BJL,
    resetRateCfg:function()
    {
        var cfgs = Game.Const.Eunms.Resault.BJL.RET_CFG;
        this.mRetCfg = {};
        this.mRetCfg[cfgs.zhuang] = 1;
        this.mRetCfg[cfgs.xian] = 1;
        this.mRetCfg[cfgs.zhuang | cfgs.xian] = 8;
        this.mRetCfg[cfgs.zhuangdui ] = 11;
        this.mRetCfg[cfgs.xiandui ] = 11;
        this.mRetCfg[cfgs.big ] = 0.5;
        this.mRetCfg[cfgs.small ] = 1.5;



    },
    resetBetCfg:function()
    {

        Game.Data.BaseRoom.CPlayerBase.prototype.resetBetCfg.apply(this,arguments);
        var cfgs = Game.Const.Eunms.Resault.BJL.RET_CFG;

        this.UserBets = { };
        this.UserBets[cfgs.zhuang] = {};
        this.UserBets[cfgs.xian] = {};
        this.UserBets[cfgs.zhuang | cfgs.xian] = {};
        this.UserBets[cfgs.zhuangdui ] = {};
        this.UserBets[cfgs.xiandui ] = {};
        this.UserBets[cfgs.zhuangdui | cfgs.xiandui] = {};
        this.UserBets[cfgs.big ] = {};
        this.UserBets[cfgs.small ] = {};

        this.BetRecord = {p:{},n:0};
        var pos = this.BetRecord.p;
        pos[cfgs.zhuang] = 0;
        pos[cfgs.xian] = 0;
        pos[cfgs.zhuang | cfgs.xian] = 0;
        pos[cfgs.zhuangdui ] = 0;
        pos[cfgs.xiandui ] = 0;
        pos[cfgs.zhuangdui | cfgs.xiandui] = 0;
        pos[cfgs.big ] = 0;
        pos[cfgs.small ] = 0;


        this.BetUsers = {};
        console.warn("--- iniit over");


    },
    updateInfo:function(info)
    {
        var cards = info.cards || {
                0:{},/// xian
                1:{} /// zhuang
            };
        var xian = cards[0],
            z = cards[1];
        for(var key in xian){
            this.Cards[0][key] = new this.CardClass(xian[key]);
        }
        for(var key in z){
            this.Cards[1][key] = new this.CardClass(z[key]);
        }

        Game.Data.BaseRoom.CPlayerBase.prototype.updateInfo.apply(this,arguments);
    },
    //initBetCfg:function()
    //{
    //    //var retCfg = Game.Const.Eunms.Resault.BJL.RET_CFG;
    //    this.UserBets = {};
    //    for(var key in this.UserBets )
    //    {
    //        this.UserBets[key] = {};
    //    }
    //}
    //endBet:function()
    //{
    //    this.status = Game.Const.Eunms.Room.BJL.status.SHOW_CARD;
    //    Game.Data.BaseRoom.CPlayerBase.prototype.endBet.call(this);
    //}
})