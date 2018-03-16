/**
 * Created by root on 3/8/17.
 */

var consts = require('../../../consts/consts');
require('../../../core/Core');
require('../../../base/servers/CBaseRemote');
require('../gameData/CDBDataCenter');
var encode = require('../../../util/encode');

Class({
    ClassName:"CPomelo.Remote.CDDBRemote",
    Base:"CPomelo.Remote.CBaseRemote",
    DataCenter:null,
    onInit:function()
    {

        console.warn("game remote init:"+ this.m_App.getServerId());
        this.DataCenter = new Game.Data.CDDBDataCenter();
    },
    GetUser:function(acc,pwd,type, cb)
    {

        if(type == 2)
        {
            this.GetGmUser(acc,pwd, cb);
        }
        else if(type == 1)
        {
            this.GetDealerUser(acc,pwd, cb);
        }
    },
    GetGmUser:function(acc,pwd,cb)
    {
        var data = this.DataCenter.getGmUser(acc);
        if( data && data.mPwd == encode.md5(pwd))
        {
            cb(null,{});
        }
        else
        {
            cb(null,null);
        }
    },
    GetDealerUser:function(acc,pwd,cb)
    {
        var data = this.DataCenter.getDealerUser(acc);


        if( data && data.mPwd == encode.md5(pwd))
        {

            cb(null,{});
        }
        else
        {
            cb(null,null);
        }
    },
    onUserLeave:function(acc, next)
    {
        next();

    }
})

module.exports = function(app) {
    return new CPomelo.Remote.CDDBRemote(app);
};