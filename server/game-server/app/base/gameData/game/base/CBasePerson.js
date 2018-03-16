/**
 * Created by Class on 2017/3/7.
 */
require("../../../../core/Core");
require("../../../../core/CMapArray");
Class({
    ClassName:"Game.Data.CBasePerson",
    mSid:null,
    ctor:function(uid,sid,dataCenter)
    {
        this.mMoney = 0;
        Object.defineProperty(this, "userid", {
            get: function () {
                return uid;
            }
        });
       this.mSid = sid;

        Object.defineProperty(this, "DataCenter", {
            get: function () {
                return dataCenter;
            }
        });

    },

    initMoney:function()
    {

    },
    ChangeMoney:function(money,force,next)
    {
        this.mMoney += money;
        next(null,this.mMoney);
    },


})