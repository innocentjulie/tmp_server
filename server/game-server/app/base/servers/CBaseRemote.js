/**
 * Created by root on 3/7/17.
 */
var Core = require("../../core/Core");

Class({
    ClassName:"CPomelo.Remote.CBaseRemote",
    m_App:null,
    ctor:function(app)
    {
        this.m_App = app;
        Core.errHandler = function (e)
        {
            if(e)
                console.warn("CPomelo.Remote.CBaseRemote:"+e);
        }

    },
    init:function(next)
    {
        next();
        this.onInit();
    },
    onInit:function()
    {

    }
})
