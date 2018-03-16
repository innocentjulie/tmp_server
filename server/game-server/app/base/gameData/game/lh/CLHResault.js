/**
 * Created by z on 2018/1/5.
 */
require("./CLHHelper");
require("../base/CBaseResault");

Core.$AlwaysDefines("Game.Const.Eunms.Resault.LH",{

    RET_CFG:{
        long:0x1,
        hu:0x1<<1,

    }
})

Class({
    ClassName:"Game.Data.Resault.LH",
    Base:"Game.Data.CBaseResault",
    He:function(value)
    {
        var cfg = Game.Const.Eunms.Resault.LH.RET_CFG;

        if(value == cfg.long || value == cfg.hu)
        {
            var he = cfg.long | cfg.hu;
            if((this.__Face & he)  === he )
            {
                return 1;
            }
        }
        return 0;
    }

}).Static({
    Resault:function(zcards,xcards)
    {

        var znum = zcards[0].Num;
        var xnum = xcards[0].Num;

        var retCfg = Game.Const.Eunms.Resault.LH.RET_CFG;

        var ret = 0;

        if(znum-xnum>-1)
        {
            ret |= retCfg.long;
        }

        if(xnum-znum>-1)
        {
            ret |= retCfg.hu;
        }


        return ret;
    }
})