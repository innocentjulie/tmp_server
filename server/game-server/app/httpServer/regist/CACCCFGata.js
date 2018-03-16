/**
 * Created by z on 2017/12/26.
 */
require("../../core/Core");
var accCFG = require("../../dao/acc_cfgDao");
Class({
    ClassName:"Game.Data.CACCCFGata",
    NextUid:{
        get:function()
        {
            this.__NextUid++;
            accCFG.updateCfgMaxUid(this.__NextUid);
            return this.__NextUid;
        }
    },
    ctor:function()
    {
        var self = this;
        accCFG.getData(function(err,data){
            if(data.length == 0)
            {
                self.__NextUid=10000;
                accCFG.getInit(self.__NextUid);
            }
            else
            {
                console.warn("maxuid is:"+JSON.stringify(data))
                self.__NextUid = data[0].maxuid;
            }
        })
    }
})