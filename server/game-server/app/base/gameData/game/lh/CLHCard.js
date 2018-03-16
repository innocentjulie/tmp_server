/**
 * Created by z on 2017/12/28.
 */
require("../base/CBaseCard");
Class({
    ClassName:"Game.Data.Card.LH",
    Base:"Game.Data.Card.CBase",
    Num:
    {
        get:function()
        {
            return this.Face&0xF;
        }
    }
})