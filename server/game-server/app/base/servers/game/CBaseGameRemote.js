/**
 * Created by z on 2017/12/26.
 */
/**
 * Created by root on 5/24/17.
 */




require("../CBaseRemote");
Class({
    ClassName:"CPomelo.Remote.CBaseGameRemote",
    Base:"CPomelo.Remote.CBaseRemote",
    DataCenter:null,
    DataCenterName:null,

    onInit:function()
    {

        if(this.DataCenterName)
            this.DataCenter = new Game.Data[this.DataCenterName](this.m_App,this);
        else
        {
            console.warn("no datacenter:"+this.constructor.ClassName);
        }

        console.warn("game remote init:"+ this.m_App.getServerId());
    },

    join:function(rid, next)
    {
        next();
    },
    onUserLeave:function(uid,next)
    {
        next();

    }

})

