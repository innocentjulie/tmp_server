/**
 * Created by z on 2018/1/5.
 */

require("./CBasePerson");
var enums = require("../../../../consts/enums");
Class({
    ClassName:"Game.Data.Game.CBasePerson",
    Base:"Game.Data.CBasePerson",
    mDeskIds:null,
    mSid:-1,
    ctor:function(uid,frontid,dataCenter,data)
    {
        this.userid = uid;
        this.mSid = frontid;
        this.DataCenter = dataCenter;
        Game.Data.CBasePerson.prototype.ctor.apply(this,arguments);
        this.mDeskIds = [];
        this.mData = data;
        this.CurrentDId = -1;
    },
    toJSON:function()
    {
        return this.mData;
    },
    push:function(info)
    {
        if(this.mSid != -1)
        {
            var rs = [{'uid':this.userid,sid:this.mSid}];
            this.DataCenter.m_App.get('channelService').pushMessageByUids(enums.PUSH_KEY.PUSH, info, rs, Core.errHandler);


        }

    }

})