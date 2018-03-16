/**
 * Created by z on 2017/12/26.
 */
require("../../../../core/Core");
var enums = require("../../../../consts/enums");
Class({
    ClassName:"Game.Data.CBaseDataCenter",
    m_App:null,
    m_Remote:null,
    ctor:function(app,remote)
    {
        this.m_App = app;
        this.m_Remote = remote;
        this.mGames = {};
    }
})