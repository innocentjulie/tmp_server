/**
 * Created by root on 3/8/17.
 */

require('../../../core/Core');
Class({
    ClassName:"Game.Data.CDealerData",
    UserData:null,
    TypeName:{
        get:function()
        {
            return "dealer"
        }
    },
    mPwd:null,
    ctor:function(data)
    {
        this.UserData = {
            account:data.account
        };
        this.mPwd = data.password;
    },

})