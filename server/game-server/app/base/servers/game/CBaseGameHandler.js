/**
 * Created by z on 2017/12/26.
 */
require("../CBaseHandler");
Class({
    ClassName:"CPomelo.Handler.CBaseGameHandler",
    Base:"CPomelo.Handler.CBaseHandler",
    DataCenter:null,
    DataCenterName:null,

    onInit:function()
    {
        if(this.DataCenterName)
            this.DataCenter = new Game.Data[this.DataCenterName](this.m_App);

        console.warn("game remote init:"+ this.m_App.getServerId());
    },

    join:function(rid, next)
    {

    },
    onUserLeave:function(uid,next)
    {
        next();

    }

})