/**
 * Created by z on 2018/1/5.
 */


require("../../../../core/Core");

Class({
    ClassName:"Game.Data.CBaseResault",
    ctor:function(f)
    {
        this.__Face = f;
        Object.defineProperty(this, "Face", {
            get: function () {
                return this.__Face;
            }
        });
    },
    He:function(value)
    {
        return this.__Face&value;
    },
    Win:function(value)
    {
        return (this.__Face&value) == value;
    },
    toJSON:function()
    {
        return this.Face;
    }

})