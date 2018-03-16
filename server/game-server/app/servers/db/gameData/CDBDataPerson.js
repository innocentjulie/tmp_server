/**
 * Created by root on 3/8/17.
 */

require('../../../core/Core');
require('../.././../base/gameData/user/CUserData');
var moneyDao = require('../.././../dao/moneyDao');
Class({
    ClassName:"Game.Data.CDBDataPerson",
    UserData:null,
    userid:null,
    init:function(data,money)
    {
        this.UserData = {
            "userid":data.userid +"",
            "name":data.name+"",
            "sex":data.sex+0,
            "livemoney":money
        };
        this.userid = data.userid;
    },
    costMoney:function(money,force)
    {
        var ret = false;
        if(money<0 && this.UserData.livemoney+money<0)
        {
            if(force)
            {
                this.UserData.livemoney = 0;
                ret = true;
            }
        }
        else
        {
            this.UserData.livemoney += money;
        }
        ret = true;
        if(ret)
        {
            moneyDao.updateMoney(this.userid,this.UserData.livemoney);
        }
        return true;
    },
    toJSON:function()
    {
        return this.UserData;
    }
}).Static({
    Create:function(uid,cb)
    {
        var self = this;
        Game.Data.CUserData.CreateByMysqlByUid(uid,function(err,pdata)
        {

            if(!err && pdata )
            {

                moneyDao.getDataByUid(uid,function(err,mData)
                {
                    if(err )
                    {
                        cb(null)
                    }
                    else
                    {
                        console.warn("has uid:"+uid);
                        var person = new self;
                        person.init(pdata.Value,mData[0].money);
                        cb(person);
                    }
                })
                return;
            }
            cb(null);


        })

    }
})