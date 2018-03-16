/**
 * Created by z on 2018/1/5.
 */
require('../../../base/gameData/game/player/CDataBasePlayerRoom');
var enums = require("../../../consts/enums");
require('../../../base/gameData/game/lh/CLHCard');
require('../../../base/gameData/game/lh/CLHResault');
require('../../../base/gameData/game/lh/CLHHelper');
Class({
    ClassName:"Game.Data.Game.CPlayerLHRoom",
    Base:"Game.Data.BaseRoom.CPlayerBase",
    GameType:"LH",
    CardClass:Game.Data.Card.LH,
    ResaultClass:Game.Data.Resault.LH,

    resetRateCfg:function()
    {
        var cfgs = Game.Const.Eunms.Resault.LH.RET_CFG;
        this.mRetCfg = {};
        this.mRetCfg[cfgs.long] = 1;
        this.mRetCfg[cfgs.hu] = 1;
        this.mRetCfg[cfgs.long | cfgs.hu] = 8;


    },

    resetBetCfg:function()
    {

        Game.Data.BaseRoom.CPlayerBase.prototype.resetBetCfg.apply(this,arguments);
        var cfgs = Game.Const.Eunms.Resault.LH.RET_CFG;

        this.UserBets = { };
        this.UserBets[cfgs.long] = {};
        this.UserBets[cfgs.hu] = {};
        this.UserBets[cfgs.long | cfgs.hu] = {};


        this.BetRecord = {p:{},n:0};
        var pos = this.BetRecord.p;
        pos[cfgs.long] = 0;
        pos[cfgs.hu] = 0;
        pos[cfgs.long | cfgs.hu] = 0;

        this.BetUsers = {};

        console.warn(JSON.stringify(this.BetRecord) + this.constructor.ClassName)


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
    //    this.UserBets = {};
    //    for(var key in this.UserBets )
    //    {
    //        this.UserBets[key] = {};
    //    }
    //},


})