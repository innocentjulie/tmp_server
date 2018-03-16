/**
 * Created by z on 2017/12/28.
 */
require("../base/CBaseCard");
Class({
    ClassName:"Game.Data.Card.BJL",
    Base:"Game.Data.Card.CBase",
    Num:
    {
        get:function()
        {
            var v = this.Face&0xF;
            return v>9?0:v;
        }
    }
})