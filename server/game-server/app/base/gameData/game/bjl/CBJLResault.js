/**
 * Created by z on 2018/1/5.
 */
require("./CBJLHelper");
require("../base/CBaseResault");

Core.$AlwaysDefines("Game.Const.Eunms.Resault.BJL",{

    RET_CFG:{
        zhuang:0x1,
        xian:0x1<<1,
        zhuangdui:0x1<<3,
        xiandui:0x1<<4,
        big:0x1<<5,
        small:0x1<<6
    }
})

Class({
    ClassName:"Game.Data.Resault.BJL",
    Base:"Game.Data.CBaseResault",
    He:function(value)
    {
        var cfg = Game.Const.Eunms.Resault.BJL.RET_CFG;

        if(value == cfg.zhuang || value == cfg.xian)
        {
            var he = cfg.zhuang | cfg.xian;
            if((this.__Face & he)  === he )
            {
                return 1;
            }
        }
        else  if(value == cfg.zhuangdui || value == cfg.xiandui)
        {
            var he = cfg.zhuangdui | cfg.xiandui;
            if((this.__Face & he)  === he )
            {
                return 1;
            }

        }
        return 0;
    }

}).Static({
    /*
    * (value & 0x0F); 123 闲   庄 和
    * (value & 0xF0) >> 4 //4:闲对   5：庄对   8：庄闲对
    * (value & 0xF00) >> 8;//大小   6是大，7是小
    * */
    Resault:function(zcards,xcards)
    {
        var helper = Game.Helper.CBJLHelper.Instance;
        var znum = helper.GetNums(zcards);
        var xnum = helper.GetNums(xcards);

        var retCfg = Game.Const.Eunms.Resault.BJL.RET_CFG;

        var ret = 0;
        console.warn("****************************");
        if(znum-xnum>-1)
        {
            ret |= retCfg.zhuang;
            console.warn("zhuang");
        }

        if(xnum-znum>-1)
        {
            ret |= retCfg.xian;
            console.warn("xian");
        }
        
        var zdui = helper.IsDui(zcards)?retCfg.zhuangdui:0;
        var xdui = helper.IsDui(xcards)?retCfg.xiandui:0;
        var sb = helper.isBig(zcards,xcards)? retCfg.small:retCfg.big;


       ret = ret | zdui |xdui | sb;
        return ret;

    }
})




