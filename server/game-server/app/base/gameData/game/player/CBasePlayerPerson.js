/**
 * Created by z on 2018/1/25.
 */
/**
 * Created by z on 2018/1/5.
 */
require('../base/CBaseGamePerson');
var enums = require("../../../../consts/enums");


Class({
    ClassName:"Game.Data.Person.CPlayerBase",
    Base:"Game.Data.Game.CBasePerson",
    toJSON:function()
    {

        return {
            info:this.mData,
            bet:this.mBetInfo
        };
    },
    bet:function(ret,money)
    {
        if(!this.mBetInfo)
        {
            this.mBetInfo ={ };

        }
        if(!this.mBetInfo[ret])
        {
            this.mBetInfo[ret] = 0;
        }
        this.mBetInfo[ret]+=money;

    },
    clearBet:function()
    {
        this.mBetInfo = {};
    },
    winMoney:function(deskId,ret)
    {

        var info = {};

        info["betResault"] = [deskId,ret];
        this.push(info);

    }
})